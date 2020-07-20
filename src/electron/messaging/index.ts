import AppWindow from "../functions/window";

import TabsListeners from './tabs';
import { ipcMain } from "electron";

let window: AppWindow;

const startRecieving = (newWindow: AppWindow) => {
    window = newWindow;

    TabsListeners(window);

    ipcMain.on('create-window', () => new AppWindow());
};

export default startRecieving;