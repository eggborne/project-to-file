
# project-to-file

`project-to-file` is an NPM package that consolidates all text-based content from a specified source directory into a single file. This helps developers, or large language models (LLMs), get a comprehensive view of a project’s codebase by excluding unnecessary files and including only relevant text.

## Features

- Compile project files into a single JSON or text file.
- Exclude specified directories and files using command-line arguments.
- Automatically exclude common irrelevant files like `.git`, `node_modules`, and others.
- Use a `.gitignore` file for exclusions.
- JSON is the default output format, but a text format is also available.

## Installation

To install `project-to-file` globally, run:

```bash
npm install -g project-to-file
```

## Usage

Basic usage requires specifying a source directory and a destination directory:

```bash
ptf <source_directory> <destination_directory> [exclusions...]
```

### Options

- `-txt`: Use this flag to generate a text file instead of the default JSON file.

### Arguments

- `<source_directory>`: The path to the source directory containing the project files you want to consolidate.
- `<destination_directory>`: The path to the directory where the output file will be saved.
- `[exclusions...]`: Optional. Paths to specific directories or files within the source directory to exclude.

### Examples

1. **Generate a JSON file (default):**

   Consolidate all relevant files from `./my-project` into `./output/my-project.json`:

   ```bash
   ptf ./my-project ./output
   ```

2. **Generate a text file using the `-txt` flag:**

   Consolidate all relevant files into a text file and save it as `./output/my-project.txt`:

   ```bash
   ptf -txt ./my-project ./output
   ```

3. **Excluding specific directories and files:**

   Exclude `src/resources` and `src/privacy.html` from the consolidation:

   ```bash
   ptf ./my-project ./output src/resources src/privacy.html
   ```

## How It Works

1. **File Inclusion**: The tool includes files with extensions typically associated with source code, documentation, and configuration, such as `.js`, `.html`, `.css`, `.md`, `.json`, etc. It specifically includes the `package.json` file for Node.js projects.
2. **Directory and File Exclusions**: Commonly excluded directories (e.g., `.git`, `node_modules`) and files (e.g., `package-lock.json`, `.env`) are automatically skipped. You can also specify additional exclusions.
3. **Output Format**: By default, the output is in JSON format, which is structured to maintain the project's directory hierarchy. Using the `-txt` flag will generate a simpler text file output.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue to help improve the tool.
