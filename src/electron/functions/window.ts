import Electron, { BrowserWindow, app, ipcMain, screen } from 'electron';
import path from 'path';
import { default as urlLib } from 'url';

import useStorage from './useStorage';
import Lowdb from 'lowdb';

const installationSettings:{
        height: number,
        width: number
    } = {
        height: 600,
        width: 800
    };
class AppWindow {
    public appWindow: Electron.BrowserWindow;
    private storage: Lowdb.LowdbSync<any>;

    constructor() {
        this.storage = useStorage('options');

        let url:string,
            isDev:boolean = process.env.NODE_ENV === "development", 
            { height, width, x, y } = this.storage.get('user.options.bounds').value(),
            firstRun:boolean = this.isFirstRun();

        this.appWindow = new BrowserWindow({
            height: firstRun ? installationSettings.height : height,
            width: firstRun ? installationSettings.width : width,
            x: firstRun ? undefined : x,
            y: firstRun ? undefined : y,
            transparent: true,
            titleBarStyle: 'hiddenInset',
            frame: false,
            webPreferences: {
              nodeIntegration: true,
              webviewTag: true,
              enableRemoteModule: true,
            },
            show: false,
            icon: path.join(app.getAppPath(), `build/img/axilos_logo${isDev ? "_nightly" : ""}_256.png`)//(process.platform !== "darwin") ? path.resolve(__dirname, "../../public/img/axilos_logo.ico") : undefined,
        });
        
        url = urlLib.format({
            pathname: path.join(app.getAppPath(), '/build/installation.html'),
            protocol: 'file:',
            slashes: true
        });

        if (isDev)
            this.appWindow.webContents.openDevTools({ mode: 'detach' });

        if (this.isFirstRun()) {
            this.appWindow.setResizable(false);
            this.appWindow.setMaximizable(false);

            ipcMain.once('verification-completed', () => {
                this.appWindow.setResizable(true);
                this.appWindow.setMaximizable(true);

                this.registerEventListeners();

                this.storage.set('verified', true).write();
                let { width, height } = screen.getPrimaryDisplay().workAreaSize;
                 
                this.storage.set('user.options.bounds', {
                    x: 0,
                    y: 0,
                    width,
                    height
                }).write();

                this.destroy();

                new AppWindow();
            });
        }

        this.appWindow.once('ready-to-show', this.appWindow.show);
        this.appWindow.loadURL(url);
          
        this.appWindow.on('closed', () => {
            this.appWindow = null;
        });
    }

    public destroy() {
        this.appWindow.close();
    }

    private registerEventListeners = () => {
        // this.appWindow.webContents.add
    }

    private isFirstRun = () => !this.storage.get('verified').value()
}

export default AppWindow;