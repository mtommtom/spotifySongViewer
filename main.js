const { app, BrowserWindow } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 700
    });
    win.loadURL('http://localhost');
}

app.whenReady().then(() => {
    createWindow();
});
