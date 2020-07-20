import AppWindow from "../electron/functions/window";

export interface EventListeners {
    [key: string]: Function
}

export interface ViewProps {
    appWindow: AppWindow, 
    id?: string,
    url: string,
    selected: boolean, 
    incognito: boolean 
}