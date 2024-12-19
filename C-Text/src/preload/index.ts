import { contextBridge } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import * as fs from 'node:fs/promises'; // Use fs.promises for async/await
import { _File } from '../renderer/src/types/Directory.d'

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
  }, // Add a comma here to separate methods

  getFile: async (filePath: string): Promise<_File> => {  // Add return type for the method
    try {
      const content = await fs.readFile(filePath, 'utf-8');

      // Extract the file name from the path
      const fileName = filePath.split('\\').pop() || 'unknown';

      // Create a new File object using the content and file name
      const file = new File([content], filePath, { type: 'text/plain' });

      // Return the custom _File object with added content
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
