import { ipcRenderer } from 'electron';
import { v4 } from 'uuid';
import { observable, action } from 'mobx';

export default class Tabs {
    
    @observable public list: any[] = [];
    @observable public selected: any = {};
    
    constructor() {
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
            id: v4()
        }) - 1;

        console.log(id, this.list[id - 1]);

        if (selected)
            this.selected = this.list[id - 1];

        return this.list[id - 1];
    }

    public findById(id: string) {
        return this.list.filter(e => e.id === id)[0]
    }

    @action
    public select(id:string) {
        this.selected = this.findById(id);
        console.log(this.selected);
    }
}