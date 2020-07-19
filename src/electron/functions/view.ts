import { BrowserView } from "electron"
import AppWindow from "./window";
// @ts-ignore
import { v4 } from 'uuid';
import NAVIGATION from '../../constants/navigation';
import { EventListeners } from '../../types/view';
export default class View {
    public view: BrowserView;
    public id: string;
    private AppWindow: AppWindow;
    
    constructor(appWindow: AppWindow, url: string = "axilos://start", selected: boolean = false) {
        
        this.id = v4();

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

        this.view.webContents.setUserAgent(
            this.view.webContents.userAgent
                .replace(/ Electron\\?.([^\s]+)/g, '')
        )

        this.updateBounds();
        this.view.setAutoResize({ 
            width: true, 
            height: true, 
            horizontal: false, 
            vertical: false 
        });

        Object.keys(this.eventListeners).forEach((e:any) => this.view.webContents.addListener(e, this.eventListeners[e]));

        this.view.webContents.loadURL(url);

        if (this.AppWindow) {
            this.AppWindow.views.push(this);

            if (selected)
                this.makeSelected();
        }
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

    private get eventListeners(): EventListeners {
        return {
            "did-navigate": () => {
                
            },
            "did-finish-load": () => {

            }
        };
    }

    public makeSelected() {
        this.AppWindow.selected = this.id;

        this.AppWindow.window.setBrowserView(this.view);

        this.updateBounds();
    }
}