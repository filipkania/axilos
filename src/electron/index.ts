
import AppWindow from './functions/window';
import { app } from 'electron';
import { platform } from 'os';

import useStorage from './functions/useStorage';

app.name = process.env.NODE_ENV === 'development' ? "Axilos Nightly" : "Axilos";

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