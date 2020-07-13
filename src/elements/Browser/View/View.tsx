import React from 'react';
import Store from '../../../functions/store/index';
// @ts-ignore
import { observer } from 'mobx-react';

const View = () => {
    return (
        Store.tabs.list.map((v, i) => (
            <webview 
                id={v.id} 
                ref={v.ref} 
                key={i} 
                src={v.startingURL} 
                style={{ display: Store.tabs.selected.id === v.id ? "flex" : "none"}}/>
        ))
    );
}

export default observer(View);