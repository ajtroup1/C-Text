import { contextBridge } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import * as fs from 'node:fs/promises';
import * as path from 'path';
import { FileInfo, Folder, Directory } from '../renderer/src/types/Directory.d';
import { AppSettings } from '../renderer/src/types/Settings.d';
import * as os from 'os'

const childProcess = require('child_process');

const excludePattern = /(^\.|\.git|\.vscode|node_modules|\.idea)/i;

const settingsDir = path.join(path.resolve(__dirname, '../../..'), 'config')
console.log(settingsDir)

const ensureSettingsDirectoryExists = async () => {
  try {
    await fs.mkdir(settingsDir, { recursive: true }); 
  } catch (error) {
    console.error('Error creating settings directory:', error);
    throw error;
  }
};

const defaultSettings: AppSettings = {
  file: {
    autosave: true
  },
  appearance: {
    theme: 'dark',
    fontSize: 'medium'
  },
  editor: {
    cursorType: 'line',
    highlightCurrentLine: true,
    showLineNumbers: true
  },
  defaultWorkspace: {
    defaultWorkspacePath: path.join(os.homedir(), 'C-Text Projects')
  },
  formatting: {
    formatOnSave: true,
    tabSize: 4,
    indentation: 'tabs',
    quoteType: 'double'
  }
}

interface NodeError extends Error {
  code?: string; // Make `code` optional (it might not always be present)
}

// Custom APIs for renderer
const customAPI = {
  getOrCreateSettings: async (): Promise<typeof defaultSettings> => {
    try {
      // Try to read the settings file
      await ensureSettingsDirectoryExists()
      const settingsFile = await fs.readFile(path.join(settingsDir, 'settings.json'), 'utf-8');
      console.log(JSON.parse(settingsFile))
      return JSON.parse(settingsFile); // Parse and return the settings
    } catch (error: unknown) {
      // If the error is an instance of NodeError, check for code
      if (error instanceof Error && (error as NodeError).code === 'ENOENT') {
        // File doesn't exist, create it with default settings
        await fs.writeFile(path.join(settingsDir, 'settings.json'), JSON.stringify(defaultSettings, null, 2));
        console.log(defaultSettings)
        return defaultSettings; // Return the default settings
      }
      // Handle other potential errors (like JSON parsing errors)
      throw new Error('Failed to read or parse settings file: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  },
  openTerminal: async (workspacePath: string) => {
    try {
      const quotedPath = `"${workspacePath}"`;

      const child = childProcess.spawn('cmd.exe', ['/c', 'start', 'cmd.exe', '/k', `cd /d ${quotedPath}`], {
        detached: true, 
        shell: true, 
      });

      child.on('error', (err) => {
        console.error('Failed to start process:', err);
      });

      child.unref(); 
    } catch (error) {
      console.error('Error:', error);
    }
  },

  getFile: async (filePath: string): Promise<_File> => {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const fileName = filePath.split(path.sep).pop() || 'unknown';

      const file = new File([content], filePath, { type: 'text/plain' });

      const fileWithContent: _File = {
        path: file.name,
        name: fileName,
        size: file.size,
        lastModified: file.lastModified,
        type: 'text/plain',
        webkitRelativePath: file.webkitRelativePath,
        arrayBuffer: file.arrayBuffer,
        bytes: file.bytes,
        slice: file.slice,
        stream: file.stream,
        text: file.text,
        content: content,
      };

      return fileWithContent;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  saveFile: async (filePath: string, content: string) => {
    try {
      await fs.writeFile(filePath, content, 'utf-8');
      console.log(`File saved successfully: ${filePath}`);
    } catch (error) {
      console.error('Error saving file:', error);
      throw error;
    }
  },

  readDirectory: async (dirPath: string): Promise<Directory> => {
    try {
      const folderContents = await fs.readdir(dirPath);  

      const dir: Directory = {
        path: dirPath,
        name: dirPath.split(/[/\\/]/).pop() ?? '',
        folders: [],
        files: []
      };

      for (const file of folderContents) {
        if (excludePattern.test(file)) {
          continue; 
        }

        const fullPath = path.join(dirPath, file);
        const stat = await fs.stat(fullPath); 

        if (stat.isDirectory()) {
          const folder: Folder = {
            name: file,
            path: fullPath,
            folders: [],
            files: []
          };

          const existingFolder = customAPI.findFolderByPath(dir, fullPath);
          if (!existingFolder) {
            const subDir = await customAPI.readDirectory(fullPath);
            folder.folders = subDir.folders; 
            folder.files = subDir.files;  
            dir.folders.push(folder);  
          }
        } else {
          const folderPath = fullPath.split('\\').slice(0, -1).join('\\');
          const fileObj: FileInfo = {
            name: file,
            path: fullPath,
            folderPath: folderPath,
            key: `${fullPath}-${Date.now()}`
          };

          const folder = customAPI.findFolderByPath(dir, folderPath);
          if (folder) {
            folder.files.push(fileObj);
          } else {
            dir.folders.push({
              name: path.basename(folderPath),
              path: folderPath,
              folders: [],
              files: [fileObj]
            });
          }
        }
      }

      return dir;
    } catch (err) {
      console.error('Error reading directory:', err);
      throw err;
    }
  },

  findFolderByPath: (dir: Directory, folderPath: string): Folder | undefined => {
    if (dir.path === folderPath) {
      return dir;
    }

    for (const folder of dir.folders) {
      if (folder.path === folderPath) {
        return folder;
      } else {
        const foundFolder = customAPI.findFolderByPath(folder, folderPath);
        if (foundFolder) {
          return foundFolder;
        }
      }
    }

    return undefined;
  }
};

// Use `contextBridge` APIs to expose Electron APIs to renderer
if (process.contextIsolated) {
  try {
    // Expose Electron APIs and custom APIs
    contextBridge.exposeInMainWorld('electron', {
      ...electronAPI, // Include the toolkit's electronAPI
      ...customAPI    // Add your custom methods
    });
  } catch (error) {
    console.error('Error exposing APIs:', error);
  }
} else {
  // Fallback for when context isolation is disabled
  // Not recommended for production
  // @ts-ignore (define in dts)
  window.electron = { ...electronAPI, ...customAPI };
}
