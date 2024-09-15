#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const generateProjectJSON = require('./generate').generateProjectJSON;
const generateProjectText = require('./generate').generateProjectText;

let useTextOutput = false;
let args = process.argv.slice(2);

// Check if the first argument is -txt
if (args[0] === '-txt') {
  useTextOutput = true;
  args = args.slice(1);
}

const [sourceDir, destDir, ...exclusions] = args;

if (!sourceDir || !destDir) {
  console.error('Usage: ptf [-txt] <source_directory> <destination_directory> [exclusions...]');
  process.exit(1);
}

// Resolve paths relative to the current working directory
const absoluteSourceDir = path.isAbsolute(sourceDir) ? sourceDir : path.resolve(process.cwd(), sourceDir);
const absoluteDestDir = path.isAbsolute(destDir) ? destDir : path.resolve(process.cwd(), destDir);
const absoluteExclusions = exclusions.map(exclusion => path.resolve(absoluteSourceDir, exclusion));

// Check if source directory exists
if (!fs.existsSync(absoluteSourceDir)) {
  console.error(`Source directory does not exist: ${absoluteSourceDir}`);
  process.exit(1);
}

// Ensure the destination directory exists or create it
if (!fs.existsSync(absoluteDestDir)) {
  fs.mkdirSync(absoluteDestDir, { recursive: true });
}

try {
  if (useTextOutput) {
    generateProjectText(absoluteSourceDir, absoluteDestDir, absoluteExclusions);
  } else {
    generateProjectJSON(absoluteSourceDir, absoluteDestDir, absoluteExclusions);
  }
} catch (error) {
  console.error('An error occurred:', error.message);
  process.exit(1);
}
