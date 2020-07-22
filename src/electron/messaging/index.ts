import AppWindow from "../functions/window";

import TabsListeners from './tabs';
import { ipcMain } from "electron";

let window: AppWindow;

const startRecieving = (newWindow: AppWindow) => {
    window = newWindow;

    TabsListeners(window);
    ipcMain.on(`${window.id}-create-window`, (_, data: { height: number, width: number }) => new AppWindow(data));
};

export default startRecieving;