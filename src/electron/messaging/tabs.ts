import { ipcMain } from "electron";
import AppWindow from "../functions/window";
import View from "../functions/view";
import { ViewProps } from "../../types/view";

export default (appWindow: AppWindow) => {
    ipcMain.on('create-tab', (_, { id, url, incognito, selected }: ViewProps) => 
        new View({
            appWindow,
            id,
            url,
            incognito,
            selected
        }));
};