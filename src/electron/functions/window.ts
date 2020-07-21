import { BrowserWindow, app, ipcMain, screen, Menu } from 'electron';
import { join } from 'path';
import { format } from 'url';

import useStorage from './useStorage';
import Lowdb from 'lowdb';
import { isDev } from '../../constants/info';

import firstRunMenu from '../menus/firstRun';
import View from './view';
import startRecieving from '../messaging/index';

const installationSettings:{
        height: number,
        width: number
    } = {
        height: 600,
        width: 800
    };
class AppWindow {
    public window: BrowserWindow;
    private storage: Lowdb.LowdbSync<any>;

    public views: View[] = [];
    public selected: string;

    constructor() {
        this.storage = useStorage('options');

        let { height, width, x, y } = this.storage.get('user.options.bounds').value(),
            firstRun:boolean = this.isFirstRun();

        this.window = new BrowserWindow({
            height: firstRun ? installationSettings.height : height,
            width: firstRun ? installationSettings.width : width,
            x: firstRun ? undefined : x,
            y: firstRun ? undefined : y,
            transparent: true,
            titleBarStyle: 'hiddenInset',
            frame: false,
            title: isDev ? "Axilos Nightly" : "Axilos",
            webPreferences: {
                plugins: true,
                nodeIntegration: true,
                contextIsolation: false,
                webviewTag: true,
                experimentalFeatures: true,
                webSecurity: false,
                enableRemoteModule: true
            },
            show: false,
            icon: join(app.getAppPath(), `build/img/axilos_logo${isDev ? "_nightly" : ""}_256.png`)
        });

        if (process.env.RUN_FROM_NPM)
            this.window.webContents.openDevTools({ mode: 'detach' });

        if (this.isFirstRun()) {
            this.window.setResizable(false);
            this.window.setMaximizable(false);

            Menu.setApplicationMenu(firstRunMenu);

            ipcMain.once('verification-completed', () => {

                this.storage.set('verified', true).write();
                let { width, height } = screen.getPrimaryDisplay().workAreaSize;
                 
                this.storage.set('user.options.bounds', {
                    x: 0,
                    y: 0,
                    width,
                    height
                }).write();

                let newWindow: AppWindow = new AppWindow();
                this.destroy();
                if (this.onInsEnd)
                    this.onInsEnd(newWindow);
            });

            this.window.loadURL(format({
                pathname: join(app.getAppPath(), `/build/installation.html`),
                protocol: 'file:',
                slashes: true
            }));
        } else {

            this.window.loadURL(format({
                pathname: join(app.getAppPath(), `/build/overlay.html`),
                protocol: 'file:',
                slashes: true
            }));

            this.registerEventListeners();
        }

        this.window.once('ready-to-show', this.window.show);
          
        this.window.on('closed', () => {
            this.window = null; 
        });
    }

    public destroy() {
        this.window.close();
    }

    private registerEventListeners = () => {
        startRecieving(this);

        this.window.on('resize', () => this.findViewById(this.selected).updateBounds());
    }

    public findViewById = (id: string) => this.views.filter(v => v.id === id)[0]

    private isFirstRun = () => !this.storage.get('verified').value()

    public onInstallationEnd = (cb: Function) => this.onInsEnd = cb; 
    private onInsEnd: Function;
}

export default AppWindow;