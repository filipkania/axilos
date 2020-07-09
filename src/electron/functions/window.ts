import Electron, { BrowserWindow, app } from 'electron';
const path = require('path');
const urlLib = require('url');
import useStorage from './useStorage';
const storage = useStorage("options");

class ElectronWindow {
    public appWindow: Electron.BrowserWindow;

    constructor(props:{
        incognito?: boolean,
        firstRun?: boolean
    } = {}) {
        let url;

        this.appWindow = new BrowserWindow({
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
                pathname: path.join(app.getAppPath(), '/build/index.html'),
                protocol: 'file:',
                slashes: true
            });

        console.log(app.getAppPath())

        props.firstRun = this.isFirstRun();

        url += "?props=" + JSON.stringify(props);

        this.appWindow.loadURL(url);
          
        this.appWindow.on('closed', () => {
            this.appWindow = null;
        });
    }

    registerEventListeners = () => {

    }

    isFirstRun = () => !storage.get('verified').value()
}

export default ElectronWindow;