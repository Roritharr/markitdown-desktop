const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process
// to use the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  selectFile: () => ipcRenderer.invoke('select-file'),
  saveFile: (content) => ipcRenderer.invoke('save-file', content),

  // Conversion API
  convertToMarkdown: async (filePath) => {
    try {
      const response = await fetch('http://localhost:5678/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file_path: filePath })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Conversion error:', error);
      throw error;
    }
  },

  // Health check for Python server
  checkServerHealth: async () => {
    try {
      const response = await fetch('http://localhost:5678/health');
      return response.ok;
    } catch (error) {
      return false;
    }
  },

  // Listen for menu events
  onMenuAction: (callback) => {
    ipcRenderer.on('menu-open-file', callback);
    ipcRenderer.on('menu-save-markdown', callback);
  },

  // Remove listeners
  removeAllListeners: () => {
    ipcRenderer.removeAllListeners('menu-open-file');
    ipcRenderer.removeAllListeners('menu-save-markdown');
  }
});