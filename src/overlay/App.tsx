import * as React from 'react';
import { useState, useEffect } from 'react';

import ReactDOM from 'react-dom';

import '../styles/index.scss'; 
import useTheme from '../functions/useTheme';
import MessagingAgent from './messaging/index';
import Store from './store/index';
// @ts-ignore
import { observer } from 'mobx-react';

const App = observer(() => {
    const [ darkTheme ] = useTheme();

    useEffect(() => {
        MessagingAgent();
        Store.createNewTab({});
    }, []);
    console.log(Store);

    return (
        <div className="router" dark-theme={darkTheme.toString()}>
            
            { Store.tabs.map((a, i) => (
                <div key={i}>
                    <button onClick={() => (Store.selected.id !== a.id) && Store.selectTab(a.id)}>{a.id}</button> 
                    <button onClick={() => Store.destroyTab(a.id)}>x</button></div>
            )) }  
            
            <button onClick={() => Store.createNewTab({
                url: 'https://github.com'
            })}>+</button>
        </div>
    );
})

ReactDOM.render(<App/>, document.getElementById('root')); 