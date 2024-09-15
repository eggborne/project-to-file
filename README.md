# Project-to-File

**Project-to-File** is a Node.js application that compiles the structure and content of a source code project into a single JSON or text file. This tool is especially useful for sharing codebases without providing full access to the repository, conducting code reviews, or archiving projects.

The application provides both a Command-Line Interface (CLI) and a Graphical User Interface (GUI) built with Electron, allowing users to easily select source and destination directories, choose output formats, and specify files or directories to exclude.

---

## Features

**Compile Projects to JSON or Text**: Convert your entire project into a structured JSON file or a concatenated text file.
**GUI and CLI Support**: Use the tool via command line or through an intuitive GUI.
**Exclusion Support**: Exclude specific files or directories from the output.
**.gitignore Integration**: Automatically ignores files and directories specified in `.gitignore`.
**Supports Multiple Languages**: Handles files with extensions like `.js`, `.py`, `.java`, `.html`, `.css`, and more.
---

## Table of Contents

Installation
Prerequisites
Clone the Repository
Install Dependencies
Usage
Running the GUI
Using the GUI
Using the CLI
CLI Options
Examples
Supported File Types
Exclusions
Using .gitignore
Specifying Exclusions
Contributing
License
---

## Installation

### Prerequisites

Node.js (version 14 or higher)
npm (comes with Node.js)
### Clone the Repository

```bash git clone https://github.com/yourusername/project-to-file.git cd project-to-file ```

### Install Dependencies

```bash npm install ```

---

## Usage

### Running the GUI

The GUI provides an easy way to select directories and options without using the command line.

Start the application with:

```bash npm start ```

This will open the Electron-based GUI application.

#### Using the GUI:

Source Directory: Click "Browse..." to select the project directory you want to compile.
Destination Directory: Click "Browse..." to select where the output file will be saved.
Output Type: Choose between JSON or Text format.
Exclusions: Click "Add Exclusion" to exclude specific files or directories. You can add multiple exclusions.
Start: Click "Start" to begin the process.
---

### Using the CLI

The CLI allows you to use the tool directly from the command line.

#### Command Syntax

```bash node cli.js [options] <source_directory> <destination_directory> [exclusions...] ```

Alternatively, if installed globally:

```bash ptf [options] <source_directory> <destination_directory> [exclusions...] ```

#### CLI Options

`-txt`: Generate a concatenated text file instead of JSON.
#### Examples

Generate a JSON file from `./my-project` to `./output`:

```bash ptf ./my-project ./output ```

Generate a text file from `./my-project` to `./output`:

```bash ptf -txt ./my-project ./output ```

Exclude specific directories or files:

```bash ptf ./my-project ./output node_modules dist ```

---

## Supported File Types

The tool processes files with the following extensions:

`.js`, `.jsx`, `.ts`, `.tsx`
`.py`, `.java`, `.c`, `.cpp`
`.html`, `.css`, `.scss`
`.md`, `.txt`, `.json`, `.yml`, `.yaml`, `.xml`
Special File: `package.json` is always included.
---

## Exclusions

### Using .gitignore

The tool automatically respects the `.gitignore` file in the source directory, excluding any files or directories specified there.

### Specifying Exclusions

You can specify additional files or directories to exclude:

GUI: Use the "Add Exclusion" button to browse and select files or directories to exclude.

CLI: List the paths after the destination directory:

```bash ptf ./my-project ./output path/to/exclude another/path/to/exclude ```

---

## Contributing

Contributions are welcome! Please follow these steps:

Fork the Repository:

Click the "Fork" button at the top right of the repository page.

Clone Your Fork:

```bash git clone https://github.com/yourusername/project-to-file.git cd project-to-file ```

Create a New Branch:

```bash git checkout -b feature/YourFeature ```

Make Your Changes:

Implement your feature or bug fix.

Commit Your Changes:

```bash git add . git commit -m "Add your message here" ```

Push to Your Fork:

```bash git push origin feature/YourFeature ```

Open a Pull Request:

Go to the original repository and click "New Pull Request," then select your branch.

---

## License

This project is licensed under the MIT License.

---

If you have any questions or need assistance, feel free to open an issue or contact the maintainer.