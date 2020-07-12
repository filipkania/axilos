
import ElectronWindow from './functions/window';
import { app } from 'electron';

let windows = [];

app.on('ready', () => {
    windows.push(new ElectronWindow());
});
app.allowRendererProcessReuse = true;