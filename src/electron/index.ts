
import AppWindow from './functions/window';
import { app } from 'electron';
import { name } from '../constants/info';

import useStorage from './functions/useStorage';

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

    app.on('window-all-closed', () => app.quit()); 
    app.allowRendererProcessReuse = true;
}