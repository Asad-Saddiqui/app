const { app, BrowserWindow } = require('electron');
const path = require('path');
const server = require('./server');


let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Optional
    },
  });

  // Load React build files
  mainWindow.loadURL("http://localhost:3000/");
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
