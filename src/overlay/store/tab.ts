// @ts-ignore
import { observable, action } from "mobx";
import { createTabProps } from "../../types/overlay";
//@ts-ignore
import { v4 } from 'uuid';
import { ipcRenderer } from "electron";
import Store from "./index";
import { NEWTAB_URL } from "../../constants/web";

class Tab {
    @observable
    public title: string;
    
    public id: string = v4();

    constructor({ url = NEWTAB_URL, incognito, selected = true }: createTabProps) {
        ipcRenderer.send(`${Store.windowID}-create-tab`, {
            id: this.id,
            url, 
            selected, 
            incognito
        });

        if (selected)
            Store.selected = this;

        Store.tabs.push(this);
    }
}

export default Tab;