// renderer.js
const { ipcRenderer } = require('electron');

const sourceDirInput = document.getElementById('sourceDir');
const destDirInput = document.getElementById('destDir');
const outputTypeSelect = document.getElementById('outputType');
const exclusionsList = document.getElementById('exclusionsList');
const statusDiv = document.getElementById('status');

let exclusions = [];

document.getElementById('browseSource').addEventListener('click', async () => {
  const dir = await ipcRenderer.invoke('select-directory');
  if (dir) {
    sourceDirInput.value = dir;
  }
});

document.getElementById('browseDest').addEventListener('click', async () => {
  const dir = await ipcRenderer.invoke('select-directory');
  if (dir) {
    destDirInput.value = dir;
  }
});

document.getElementById('addExclusion').addEventListener('click', async () => {
  if (!sourceDirInput.value) {
    alert('Please select a source directory first.');
    return;
  }

  // Ask the user if they want to exclude a file or directory
  const exclusionType = confirm('Click OK to exclude a directory, or Cancel to exclude a file.');

  let exclusionPath;
  if (exclusionType) {
    // User chose to exclude a directory
    exclusionPath = await ipcRenderer.invoke('select-exclusion-directory', sourceDirInput.value);
  } else {
    // User chose to exclude a file
    exclusionPath = await ipcRenderer.invoke('select-exclusion-file', sourceDirInput.value);
  }

  if (exclusionPath) {
    // Ensure the exclusion is within the source directory
    if (!exclusionPath.startsWith(sourceDirInput.value)) {
      alert('Exclusions must be within the source directory.');
      return;
    }

    exclusions.push(exclusionPath);
    updateExclusionsList();
  }
});

function updateExclusionsList() {
  exclusionsList.innerHTML = '';
  exclusions.forEach((exclusion, index) => {
    const li = document.createElement('li');
    li.textContent = exclusion;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.style.marginLeft = '10px';
    removeButton.addEventListener('click', () => {
      exclusions.splice(index, 1);
      updateExclusionsList();
    });

    li.appendChild(removeButton);
    exclusionsList.appendChild(li);
  });
}

document.getElementById('project-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const sourceDir = sourceDirInput.value;
  const destDir = destDirInput.value;
  const outputType = outputTypeSelect.value;

  if (!sourceDir || !destDir) {
    statusDiv.innerText = 'Please select both source and destination directories.';
    return;
  }

  statusDiv.innerText = 'Processing...';

  const result = await ipcRenderer.invoke('process-project', {
    sourceDir,
    destDir,
    useTextOutput: outputType === 'text',
    exclusions
  });

  if (result.success) {
    statusDiv.innerText = result.message;
  } else {
    statusDiv.innerText = `An error occurred: ${result.message}`;
  }
});
