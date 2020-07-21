import AppWindow from './functions/window';
import { app, BrowserWindow, ipcMain } from 'electron';
import { name } from '../constants/info';

import useStorage from './functions/useStorage';
import handleCrash from './functions/handleCrash';

let window: AppWindow;
const options = useStorage('options');

app.setName(name);

if (!app.requestSingleInstanceLock())
    app.quit();
else {

    if (!options.get('user.options.hardwareAcceleration').value())
        app.disableHardwareAcceleration();

    app.on('ready', () => {
        if (process.env.RUN_FROM_NPM) 
            options.set('verified', false).write();
        window = new AppWindow();

        window.onInstallationEnd((newWindow: AppWindow) => window = newWindow)
    });

    if (!process.env.RUN_FROM_NPM) 
        ipcMain.on('overlay-crashed', handleCrash);

    app.on('second-instance', () => {
        const windows = BrowserWindow.getAllWindows();
        if (!windows[0] && !windows[0].isDestroyed())
            return;

        if (windows[0].isMinimized())
            windows[0].restore()
        windows[0].focus();
    });

    app.on('before-quit', () => {
        const windows = BrowserWindow.getAllWindows();
        if (!windows[0] && !windows[0].isDestroyed())
            return;

        const storage = useStorage('options');
        const { width, height, x, y } = windows[0].getBounds(); 

        storage.set('user.options.bounds', {
            width,
            height,
            x,
            y
        }).write();
    });

    app.on('window-all-closed', () => app.quit()); 
    app.allowRendererProcessReuse = true;
}