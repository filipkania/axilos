import { ipcRenderer } from "electron";

import Store from '../store/index';
// @ts-ignore
import { v4 } from 'uuid';

const MessagingAgent = () => {
    ipcRenderer.send('create-tab', {
        id: v4(),
        url: "https://google.com",
        incognito: false,
        selected: true
    });
};

export default MessagingAgent;