import * as React from 'react';
import { useState, useEffect } from 'react';

import ReactDOM from 'react-dom';

import '../styles/index.scss'; 
import useTheme from '../functions/useTheme';
import MessagingAgent from './messaging/index';
import { ipcRenderer } from 'electron';

const App = () => {
    const [ darkTheme ] = useTheme();

    useEffect(MessagingAgent, []);

    return (
        <div className="router" dark-theme={darkTheme.toString()}>
            nice! its a test <button onClick={() => ipcRenderer.send('create-window')}>pogchamp</button>
        </div>
    );
}

ReactDOM.render(<App/>, document.getElementById('root')); 