import { WebviewTag } from 'electron';
// @ts-ignore
import { v4 } from 'uuid';
import { remote } from 'electron';
import { createRef } from 'react';
// @ts-ignore
import { observable, action, observe } from 'mobx';
import { Tab } from '../../types/tabs';

export default class Tabs {
    
    @observable public list: Tab[] = [];
    @observable public selected: Tab = null;

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
            startingURL: url,
            currentURL: url,
            currentTitle: "",
            id: v4(),
            ref: createRef<WebviewTag>()
        }) - 1;

        console.log(id, this.list[id]);


        if (selected)
            this.selected = this.list[id];
            
        observe(this.list[id].ref, ({oldValue, newValue}:any) => oldValue === null && newValue !== null && this.list[id] && this.registerEventListeners(this.list[id])) 
        return this.list[id];
    }

    public findById(id: string) {
        return this.list.filter(e => e.id === id)[0]
    }

    @action
    public select(id:string) {
        if (this.findById(id) === this.selected) return;
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


    private registerEventListeners(t:Tab) {
        t.ref.current.addEventListener('will-navigate', (e: Electron.WillNavigateEvent) => {
            t.currentURL = e.url;
            t.currentTitle = "";
        });

        t.ref.current.addEventListener('page-title-updated', (e:Electron.PageTitleUpdatedEvent) => {
            t.currentTitle = e.title;
        })
    }
}