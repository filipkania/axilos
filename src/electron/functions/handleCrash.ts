import { BrowserWindow, app } from "electron";
import { join } from 'path';
import { isDev, name } from '../../constants/info';
import { format } from 'url';
import os from 'os';

export default (_:any, { error }: { error: Error }) => {
    let allWindows = BrowserWindow.getAllWindows();

    if (error.stack !== undefined)
        error.stack = error.stack.split("\n    ").join(" \n ");

    let view = new BrowserWindow({
        height: 600,
        width: 800,
        transparent: true,
        titleBarStyle: 'hiddenInset',
        frame: false,
        title: isDev ? "Axilos Nightly" : "Axilos",
        webPreferences: {
            plugins: false,
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
        show: false,
        resizable: false,
        maximizable: false,
        icon: join(app.getAppPath(), `build/img/axilos_logo${isDev ? "_nightly" : ""}_256.png`)
    });

    view.on('ready-to-show', view.show);
    view.loadURL(format({
        pathname: join(app.getAppPath(), `/build/error.html`),
        protocol: 'file:',
        slashes: true
    }) + `?error=${JSON.stringify({
        name,
        isDev,
        date: new Date(),
        error: {
            stack: error.stack,
            name: error.name,
            message: error.message,
            device: {
                "cpu": os.cpus()[0].model,
                "arch": os.arch(),
                "platform": os.platform(),
                "release": os.release(),
                "memory": {
                    "free": os.freemem(),
                    "total": os.totalmem()
                },
                "uptime": os.uptime()
            }
        }
    })}`);

    if (process.env.RUN_FROM_NPM)
        view.webContents.openDevTools({ mode: 'detach' });


    allWindows.forEach(w => w.close());
}