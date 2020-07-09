const { app } = require('electron');
import ElectronWindow from './functions/window';

let windows = [];

app.on('ready', () => {
    windows.push(new ElectronWindow());
});
app.allowRendererProcessReuse = true;