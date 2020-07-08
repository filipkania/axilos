const { app } = require('electron');
const Window = require('./window');

let windows = [];

app.on('ready', () => {
    windows.push(new Window());
});
app.allowRendererProcessReuse = true;