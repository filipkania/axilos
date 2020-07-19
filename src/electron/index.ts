
import AppWindow from './functions/window';
import { app } from 'electron';
import { platform } from 'os';
import { name } from '../constants/info';

import useStorage from './functions/useStorage';

let window: AppWindow;

app.name = name;

if (!app.requestSingleInstanceLock())
    app.quit();
else {
    app.on('ready', () => {
        if (process.env.RUN_FROM_NPM) 
            useStorage('options').set('verified', false).write();

        window = new AppWindow();

        window.onInstallationEnd((newWindow: AppWindow) => window = newWindow)
    });

    app.on('second-instance', () => {
        if (!window)
            return;

        if (window.window.isMinimized())
            window.window.restore()
        window.window.focus();
    });

    app.on('before-quit', () => {
        const storage = useStorage('options');
        const { width, height, x, y } = window.window.getBounds(); 

        storage.set('user.options.bounds', {
            width,
            height,
            x,
            y
        }).write();
    });

    app.on('window-all-closed', () => {
        if (platform() !== 'darwin') 
            app.quit();
    }); 
    app.allowRendererProcessReuse = true;
}