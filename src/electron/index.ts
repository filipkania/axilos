
import AppWindow from './functions/window';
import { app } from 'electron';
import { platform } from 'os';

import useStorage from './functions/useStorage';

app.on('ready', async () => { 
    if (process.env.RESET_VERIFIED) 
        useStorage('options').set('verified', false).write();

    new AppWindow();
});

app.on('window-all-closed', () => {
    if (platform() !== 'darwin') 
        app.quit();
}); 
app.allowRendererProcessReuse = true;