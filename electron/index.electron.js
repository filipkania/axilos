const { app } = require('electron');
const Window = require('./functions/window');

let windows = [];

app.on('ready', () => {
    windows.push(new Window());
});
app.allowRendererProcessReuse = true;