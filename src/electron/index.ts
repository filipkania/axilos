
import AppWindow from './functions/window';
import { app } from 'electron';
import { platform } from 'os';
import { name } from '../constants/info';

import useStorage from './functions/useStorage';

app.name = name;

app.on('ready', async () => { 
    if (process.env.RUN_FROM_NPM) 
        useStorage('options').set('verified', false).write();

    new AppWindow();
});

app.on('window-all-closed', () => {
    if (platform() !== 'darwin') 
        app.quit();
}); 
app.allowRendererProcessReuse = true;