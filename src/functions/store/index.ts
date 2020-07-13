import { useRef } from 'react';
import TabStore from './tabs';


class Store {

    public tabs = new TabStore(this);

    constructor() {

    }
}

export default new Store();