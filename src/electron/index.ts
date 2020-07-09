const { app, protocol } = require('electron');
import ElectronWindow from './functions/window';
import path from 'path';

let windows = [];

app.on('ready', () => {
    windows.push(new ElectronWindow());
});
app.allowRendererProcessReuse = true;