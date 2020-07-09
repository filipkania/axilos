import Electron, { BrowserWindow, app } from 'electron';
import path from 'path';
import { default as urlLib } from 'url';

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
            show: false,
            icon: path.join(app.getAppPath(), "build/img/axilos_500x500.png")//(process.platform !== "darwin") ? path.resolve(__dirname, "../../public/img/axilos_logo.ico") : undefined,
        });
        
        if (process.env.NODE_ENV === 'development')
            url = `http://localhost:3000`;
        else
            url = urlLib.format({
                pathname: path.join(app.getAppPath(), '/build/index.html'),
                protocol: 'file:',
                slashes: true
            });

        props.firstRun = this.isFirstRun();
        url += "?props=" + JSON.stringify(props);

        this.appWindow.once('ready-to-show', this.appWindow.show);
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