import React from 'react';
import Store from '../../../functions/store/index';
import { observer } from 'mobx-react';
import { BrowserView } from 'electron';

class View extends React.Component<any, any> {

    private View:BrowserView=

    constructor(props:any) {
        super(props);
    }

    render() {
        return (
            <webview id={Store.tabs.selected.id} src={Store.tabs.selected.url}/>
        );
    }

}

export default observer(View);