// main.js
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { generateProjectJSON, generateProjectText } = require('./generate');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Allow Node.js integration
      contextIsolation: false // Required for ipcRenderer
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// Handle directory selection from renderer
ipcMain.handle('select-directory', async (event) => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory']
  });
  return result.filePaths[0];
});

// Handle exclusion directory selection
ipcMain.handle('select-exclusion-directory', async (event, defaultPath) => {
  const result = await dialog.showOpenDialog({
    title: 'Select Directory to Exclude',
    defaultPath,
    properties: ['openDirectory']
  });
  return result.filePaths[0];
});

// Handle exclusion file selection
ipcMain.handle('select-exclusion-file', async (event, defaultPath) => {
  const result = await dialog.showOpenDialog({
    title: 'Select File to Exclude',
    defaultPath,
    properties: ['openFile']
  });
  return result.filePaths[0];
});

// Handle processing the project
ipcMain.handle('process-project', async (event, args) => {
  const { sourceDir, destDir, useTextOutput, exclusions } = args;

  try {
    if (useTextOutput) {
      generateProjectText(sourceDir, destDir, exclusions);
    } else {
      generateProjectJSON(sourceDir, destDir, exclusions);
    }
    return { success: true, message: 'Processing completed successfully.' };
  } catch (error) {
    return { success: false, message: error.message };
  }
});
