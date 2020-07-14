import { WebviewTag } from "electron";

export interface Tab {
    
    startingURL: string;
    currentURL: string;
    currentTitle: string;

    ref: React.RefObject<WebviewTag>;

    id: string;

}