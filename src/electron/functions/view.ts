import { BrowserView } from "electron"
import AppWindow from "./window";
import NAVIGATION from '../../constants/navigation';

export default class View {
    public view: BrowserView;
    private AppWindow: AppWindow;
    
    constructor(appWindow: AppWindow, url: string = "axilos://start") {
        this.view = new BrowserView({
            webPreferences: {
                sandbox: true,
                contextIsolation: true,
                partition: 'persist:view',
                scrollBounce: true,
                nodeIntegration: false,
            }
        });
        this.AppWindow = appWindow;
        this.AppWindow.window.setBrowserView(this.view);

        this.updateBounds();
        this.view.setAutoResize({ width: true, height: true, horizontal: false, vertical: false });

        this.view.webContents.loadURL(url);

    }

    public updateBounds() {
        const { width, height } = this.AppWindow.window.getBounds();

        this.view.setBounds({
            x: 0,
            y: NAVIGATION.HEIGHT,
            height: height - NAVIGATION.HEIGHT,
            width: width
        });
    }
}