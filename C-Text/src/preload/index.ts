import { contextBridge } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import * as fs from 'node:fs/promises'; // Use fs.promises for async/await

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
