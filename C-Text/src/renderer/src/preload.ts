const { contextBridge, ipcRenderer } = require('electron');

// Expose the saveFile function to the renderer process
contextBridge.exposeInMainWorld('electron', {
  saveFile: (content) => ipcRenderer.invoke('dialog:saveFile', content),
  getFile: (filePath) => ipcRenderer.invoke('dialog:getFile', filePath),
  readDirectory: (dirPath) => ipcRenderer.invoke('dialog:readDirectory', dirPath),
  openTerminal: (workspacePath) => ipcRenderer.invoke('dialog:openTerminal', workspacePath),
  getOrCreateSettings: () => ipcRenderer.invoke('dialog:getOrCreateSettings'),
  saveSettings: (newSettings) => ipcRenderer.invoke('dialog:saveSettings', newSettings)
});