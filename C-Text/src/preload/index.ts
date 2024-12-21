import { contextBridge } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import * as fs from 'node:fs/promises'; // Use fs.promises for async/await
import * as path from 'path';
import { FileInfo, Folder, Directory } from '../renderer/src/types/Directory.d';

const excludePattern = /(^\.|\.git|\.vscode|node_modules|\.idea)/i;

// Custom APIs for renderer
const customAPI = {
  saveFile: async (filePath: string, content: string) => {
    try {
      await fs.writeFile(filePath, content, 'utf-8');
      console.log(`File saved successfully: ${filePath}`);
    } catch (error) {
      console.error('Error saving file:', error);
      throw error;
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


 readDirectory: async (dirPath: string): Promise<Directory> => {
    try {
      console.log("backend", dirPath); // Log to ensure correct path is passed
      const folderContents = await fs.readdir(dirPath);  // Read the directory

      const dir: Directory = {
        path: dirPath,
        name: dirPath.split(/[/\\/]/).pop() ?? '',
        folders: [],
        files: []
      };

      for (const file of folderContents) {
        // Skip files or folders that match the exclusion pattern
        if (excludePattern.test(file)) {
          continue; // Skip the file/folder
        }

        const fullPath = path.join(dirPath, file);
        const stat = await fs.stat(fullPath); // Check if it's a file or directory

        if (stat.isDirectory()) {
          // Recursive call for directories
          const folder: Folder = {
            name: file,
            path: fullPath,
            folders: [],
            files: []
          };

          // Avoid infinite recursion by checking if folder already exists in the entire folder structure
          const existingFolder = customAPI.findFolderByPath(dir, fullPath);
          if (!existingFolder) {
            // Recursive call to get subfolders and files
            const subDir = await customAPI.readDirectory(fullPath);
            folder.folders = subDir.folders; // Add subfolders
            folder.files = subDir.files;     // Add files in the directory
            dir.folders.push(folder);        // Add the folder to the root directory's folders
          }
        } else {
          // Handle files
          const folderPath = fullPath.split('\\').slice(0, -1).join('\\');
          const fileObj: FileInfo = {
            name: file,
            path: fullPath,
            folderPath: folderPath,
            key: `${fullPath}-${Date.now()}`
          };

          // Find the corresponding folder in the folder tree
          const folder = customAPI.findFolderByPath(dir, folderPath);
          if (folder) {
            folder.files.push(fileObj);  // Add the file to the correct folder
          } else {
            // If folder doesn't exist yet, create it and add the file
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
 

  // Helper function to recursively find a folder by path
  findFolderByPath: (dir: Directory, folderPath: string): Folder | undefined => {
    // First check the root folder itself
    if (dir.path === folderPath) {
      return dir;
    }

    // Then, recursively check each subfolder
    for (const folder of dir.folders) {
      if (folder.path === folderPath) {
        return folder;
      } else {
        // Recursively search inside subfolders
        const foundFolder = customAPI.findFolderByPath(folder, folderPath);
        if (foundFolder) {
          return foundFolder;
        }
      }
    }

    // If no folder found, return undefined
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
