// @ts-ignore
import { observable, action } from "mobx";
import Tab from "./tab";
import { createTabProps } from "../../types/overlay";
import { ipcRenderer } from "electron";
import { remote } from 'electron';


class Store {

    @observable
    public tabs: Tab[] = [];

    public lastClosed: Tab[] = [];

    @observable
    public selected: Tab;

    public getTabById = (id: string) => this.tabs.filter((a) => a.id === id)[0];
    public createNewTab = (data?: createTabProps) => new Tab(data);
    
    @action
    public selectTab = (id: string) => {
        ipcRenderer.send('select-tab', id);
        this.selected = this.getTabById(id);
    }

    @action
    public destroyTab = (id: string) => {
        ipcRenderer.send('destroy-tab', id);

        const tab = this.getTabById(id);
        if (!tab)
            return false;

        this.lastClosed.push(tab);

        if (this.tabs.length - 1 < 1)
            remote.app.quit()
        else {

            this.tabs.splice(this.tabs.indexOf(tab), 1); 
            this.selectTab(this.tabs[0].id);
        }
    }

}

export default new Store();