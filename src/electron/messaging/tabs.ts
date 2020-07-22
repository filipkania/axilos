import { ipcMain } from "electron";
import AppWindow from "../functions/window";
import View from "../functions/view";
import { ViewProps } from "../../types/view";

export default (appWindow: AppWindow) => {
    ipcMain.on(`${appWindow.id}-create-tab`, (_, data: ViewProps) => {
        const { id, url, incognito, selected } = data;
        new View({
            appWindow,
            id,
            url,
            incognito,
            selected
        });
    });

    ipcMain.on(`${appWindow.id}-destroy-tab`, (_, id) => appWindow.findViewById(id).destroy())
    ipcMain.on(`${appWindow.id}-select-tab`, (_, id) => appWindow.findViewById(id).makeSelected())
};