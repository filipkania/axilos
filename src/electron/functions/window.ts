import Electron, { BrowserWindow, app, ipcMain, screen } from 'electron';
import path from 'path';
import { default as urlLib } from 'url';

import useStorage from './useStorage';
const storage = useStorage("options");

let windows:Array<ElectronWindow> = [];

class ElectronWindow {
    public appWindow: Electron.BrowserWindow;

    constructor(props:{
        incognito?: boolean,
        firstRun?: boolean
    } = {}) {
        let url;
        props.firstRun = this.isFirstRun();

        windows.push(this);

        this.appWindow = new BrowserWindow({
            width: 800,
            height: 600,
            transparent: true,
            titleBarStyle: 'hiddenInset',
            frame: false,
            webPreferences: {
              nodeIntegration: true,
              webviewTag: true,
              enableRemoteModule: true,
            },
            show: false,
            icon: path.join(app.getAppPath(), `build/img/axilos_logo${process.env.NODE_ENV === "development" ? "_nightly" : ""}_256.png`)//(process.platform !== "darwin") ? path.resolve(__dirname, "../../public/img/axilos_logo.ico") : undefined,
        });
        
        url = urlLib.format({
            pathname: path.join(app.getAppPath(), '/build/installation.html'),
            protocol: 'file:',
            slashes: true
        });

        if (process.env.NODE_ENV === "development")
            this.appWindow.webContents.openDevTools({ mode: 'detach' });

        if (props.firstRun) {
            this.appWindow.setResizable(false);
            this.appWindow.setMaximizable(false);

            ipcMain.once('verification-completed', () => {
                this.appWindow.setResizable(true);
                this.appWindow.setMaximizable(true);

                this.registerEventListeners();
                if (process.env.NODE_ENV !== 'development')
                    storage.set('verified', true).write();
                let { width, height } = storage.get('user.options').value();
                 
                if (!width || !height) return;

                this.appWindow.setSize(width, height, true);
                this.appWindow.setPosition(0, 0);
            });
        }

        url += "?props=" + JSON.stringify(props);

        this.appWindow.once('ready-to-show', this.appWindow.show);
        this.appWindow.loadURL(url);
          
        this.appWindow.on('closed', () => {
            this.appWindow = null;
        });
    }

    registerEventListeners = () => {
        // this.appWindow.webContents.add
    }

    isFirstRun = () => !storage.get('verified').value()

    getAllWindows = ():Array<ElectronWindow> => windows;
}

export default ElectronWindow;