import * as React from 'react';
import { useState, useEffect } from 'react';

import ReactDOM from 'react-dom';

import '../styles/index.scss'; 
import useTheme from '../functions/useTheme';
import MessagingAgent from './messaging/index';
import Store from './store/index';
// @ts-ignore
import { observer } from 'mobx-react';
import { ipcRenderer } from 'electron';
import navigation from '../constants/navigation';
import ErrorBoundary from './elements/ErrorBoundary';
import createWindow from './functions/createWindow';

const App = observer(() => {
    const [ darkTheme ] = useTheme();

    useEffect(() => {
        Store.windowID = window.location.search.replace("?id=", "");

        MessagingAgent();
        Store.createNewTab();
    }, []);
    console.log(Store);

    return (
        <div className="router" dark-theme={darkTheme.toString()}>
            <div className="toolbar" style={{ height: navigation.HEIGHT }}>
                { Store.tabs.map((a, i) => (
                    <div key={i}>
                        <button style={{ backgroundColor: (Store.selected.id === a.id) ? 'red' : undefined }}onClick={() => Store.selectTab(a.id)}>{a.id}</button> 
                        <button onClick={() => Store.destroyTab(a.id)}>x</button>
                        </div>
                )) }  
                
                <button onClick={() => Store.createNewTab({
                    url: 'https://github.com'
                })}>+</button>

                <button onClick={createWindow}>_</button>
            </div>
        </div>
    );
})

ReactDOM.render(<ErrorBoundary><App/></ErrorBoundary>, document.getElementById('root')); 