const { app, BrowserWindow } = require('electron');
const web = require('./app')

const createWindow = () => {
    const win = new BrowserWindow({
        // fullscreen: true
        width: 1000,
        height: 700
    });
    // win.maximize();pp
    // win.show();
    win.loadURL('http://localhost');
}

app.whenReady().then(() => {
    createWindow();
});