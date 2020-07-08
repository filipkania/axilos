import React, { useState, useEffect } from 'react';

import ReactDOM from 'react-dom';
import Logo from '../public/img/axilos_logo.png';

import './styles/index.scss';

const path = require('path');

const App = () => {
    const [ incognito, setIncognito ] = useState(false);
    
    useEffect(() => {
        let url = new URLSearchParams(window.location.search);
        console.log(JSON.parse(url.get('props')));
    }, []);

    return (
        <div style={{ width: "100%", height: "100%", borderRadius: "50%"}}>
            <img src={Logo} alt="test"/> 
            <h1>{path.resolve(window.__dirname, "pogchamp/")}</h1>
            
            <h1>{incognito ? "pog" : "niepog"}</h1>
        </div>
    );
}


ReactDOM.render(<App/>, document.getElementById('root'));