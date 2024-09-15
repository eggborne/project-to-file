// index.js
const fs = require('fs');
const path = require('path');
const ignore = require('ignore');

// Define relevant file extensions
const relevantExtensions = [
  '.js', '.jsx', '.ts', '.tsx', '.py', '.java', '.c', '.cpp',
  '.html', '.css', '.scss', '.md', '.txt', '.json', '.yml', '.yaml', '.xml'
];

// Define irrelevant directories and files, but include package.json
const irrelevantDirs = [
  '.git', 'node_modules', 'dist', 'build', 'coverage', '__pycache__'
];

const irrelevantFiles = [
  'package-lock.json', 'yarn.lock', '.env', '.gitignore'
];

function generateProjectJSON(sourceDir, destDir, exclusions = []) {
  const gitignorePath = path.join(sourceDir, '.gitignore');
  let ig = null;

  // Check if .gitignore exists and read it
  if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
    ig = ignore().add(gitignoreContent);
  }

  // Define getAllRelevantFiles as an inner function
  function getAllRelevantFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      // Check if the path is in the exclusions list
      if (exclusions.some(exclusion => filePath === exclusion || filePath.startsWith(exclusion + path.sep))) {
        return; // Skip this path
      }

      // Skip irrelevant directories
      if (stat.isDirectory()) {
        if (irrelevantDirs.includes(file)) {
          return; // Skip this directory
        }
        getAllRelevantFiles(filePath, fileList);
      } else {
        const ext = path.extname(file).toLowerCase();
        // Include package.json specifically
        if (file === 'package.json' || (relevantExtensions.includes(ext) && !irrelevantFiles.includes(file))) {
          // Compute relative path correctly
          const relativePath = path.relative(sourceDir, filePath);
          // Check if the file is ignored by .gitignore
          if (!ig || !ig.ignores(relativePath)) {
            fileList.push(filePath);
          }
        }
      }
    });

    return fileList;
  }

  const relevantFiles = getAllRelevantFiles(sourceDir);
  const projectStructure = {};

  relevantFiles.forEach((filePath) => {
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const relativePath = path.relative(sourceDir, filePath);
    const fileParts = relativePath.split(path.sep);
    let current = projectStructure;

    // Build nested JSON structure
    for (let i = 0; i < fileParts.length; i++) {
      const part = fileParts[i];
      if (i === fileParts.length - 1) {
        // Last part, which is the file
        current[part] = {
          type: 'file',
          content: fileContents
        };
      } else {
        // Directory part
        if (!current[part]) {
          current[part] = {
            type: 'directory',
            children: {}
          };
        }
        current = current[part].children;
      }
    }
  });

  const outputFile = path.join(destDir, `${path.basename(sourceDir)}-compiled.json`);
  fs.writeFileSync(outputFile, JSON.stringify(projectStructure, null, 2), 'utf-8');

  console.log(`Project JSON file created at: ${outputFile}`);
}

function generateProjectText(sourceDir, destDir, exclusions = []) {
  const gitignorePath = path.join(sourceDir, '.gitignore');
  let ig = null;

  // Check if .gitignore exists and read it
  if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
    ig = ignore().add(gitignoreContent);
  }

  // Define getAllRelevantFiles as an inner function
  function getAllRelevantFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      // Check if the path is in the exclusions list
      if (exclusions.some(exclusion => filePath === exclusion || filePath.startsWith(exclusion + path.sep))) {
        return; // Skip this path
      }

      // Skip irrelevant directories
      if (stat.isDirectory()) {
        if (irrelevantDirs.includes(file)) {
          return; // Skip this directory
        }
        getAllRelevantFiles(filePath, fileList);
      } else {
        const ext = path.extname(file).toLowerCase();
        // Include package.json specifically
        if (file === 'package.json' || (relevantExtensions.includes(ext) && !irrelevantFiles.includes(file))) {
          // Compute relative path correctly
          const relativePath = path.relative(sourceDir, filePath);
          // Check if the file is ignored by .gitignore
          if (!ig || !ig.ignores(relativePath)) {
            fileList.push(filePath);
          }
        }
      }
    });

    return fileList;
  }

  const relevantFiles = getAllRelevantFiles(sourceDir);

  const outputFile = path.join(destDir, `${path.basename(sourceDir)}.txt`);
  const writeStream = fs.createWriteStream(outputFile);

  relevantFiles.forEach((filePath) => {
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const relativePath = path.relative(sourceDir, filePath);
    writeStream.write(`--- ${relativePath} ---\n`);
    writeStream.write(fileContents + '\n\n');
  });

  writeStream.end();
  console.log(`Project text file created at: ${outputFile}`);
}

module.exports = {
  generateProjectJSON,
  generateProjectText
};
