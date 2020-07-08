const { BrowserWindow } = require('electron');
const path = require('path');
const urlLib = require('url');
const useStorage = require('./useStorage');
const storage = useStorage("options");

class Window {
    constructor(props = {}) {
        let url;

        this.window = new BrowserWindow({
            width: 800,
            height: 600,
            titleBarStyle: 'hiddenInset',
            transparent: true,
            webPreferences: {
              nodeIntegration: true,
            },
            icon: (process.platform !== "darwin") ? path.resolve(__dirname, "../../public/img/axilos_logo.ico") : undefined,
        });
        
        if (process.env.NODE_ENV === 'development')
            url = `http://localhost:3000`;
        else 
            url = urlLib.format({
                pathname: path.join(__dirname, '../../build/index.html'),
                protocol: 'file:',
                slashes: true
            });

        props.firstRun = this.isFirstRun();

        url += "?props=" + JSON.stringify(props);

        this.window.loadURL(url);
          
        this.window.on('closed', () => {
            this.window = null;
        });
    }

    registerEventListeners = () => {

    }

    isFirstRun = () => !storage.get('verified').value()
}

module.exports = Window;