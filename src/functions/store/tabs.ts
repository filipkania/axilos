import { ipcRenderer, WebviewTag } from 'electron';
import { v4 } from 'uuid';
import { remote } from 'electron';
import { createRef } from 'react';
import { observable, action, observe } from 'mobx';

export default class Tabs {
    
    @observable public list: any[] = [];
    @observable public selected: any = {};

    private Store:any;
    
    constructor(store:any) {
        this.Store = store;

        this.create({
            url: "https://github.com",
            selected: true
        });
    }

    @action 
    public create({ url, selected }: {
        url: string,
        selected?: boolean
    }) {
        const id = this.list.push({
            url,
            id: v4(),
            ref: createRef<WebviewTag>()
        }) - 1;

        console.log(id, this.list[id]);

        if (selected)
            this.selected = this.list[id];
            
        observe(this.list[id].ref, ({oldValue, newValue}:any) => oldValue === null && newValue === this.list[id].ref && console.log(this.list[id].ref.current)) 
        return this.list[id];
    }

    public findById(id: string) {
        return this.list.filter(e => e.id === id)[0]
    }

    @action
    public select(id:string) {
        this.selected = this.findById(id);
        console.log(this.selected);
    }

    @action
    public destroy(id:string) {
        if (this.selected.id === id) {
            if (this.list.length - 1 < 1)
                remote.app.exit();
            else
                this.selected = this.list[0];
        }

        this.list.splice(this.list.indexOf(this.findById(id)), 1);
    }
}