import * as React from 'react';
import { useState, useEffect } from 'react';

import ReactDOM from 'react-dom';

import '../styles/index.scss'; 
import useTheme from '../functions/useTheme';

const App = () => {
    const [ darkTheme ] = useTheme();

    return (
        <div className="router" dark-theme={darkTheme.toString()}>
            nice! its a test
        </div>
    );
}

ReactDOM.render(<App/>, document.getElementById('root')); 