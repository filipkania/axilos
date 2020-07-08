const { BrowserWindow } = require('electron');
const path = require('path');
const urlLib = require('url');

class Window {
    constructor(props = {}) {
        let url;

        this.window = new BrowserWindow({
            width: 800,
            height: 600,
            titleBarStyle: 'hidden',
            webPreferences: {
              nodeIntegration: true,
            },
            icon: path.resolve(__dirname, "../../public/img/axilos_logo.png"),
        });
        
        if (process.env.NODE_ENV === 'development')
            url = `http://localhost:3000`;
        else 
            url = urlLib.format({
                pathname: path.join(__dirname, '../../build/index.html'),
                protocol: 'file:',
                slashes: true
            });
        url += "?props=" + JSON.stringify(props);

        this.window.loadURL(url);
          
        this.window.on('closed', () => {
            this.window = null;
        });
    }

    registerEventListeners() {

    }
}

module.exports = Window;