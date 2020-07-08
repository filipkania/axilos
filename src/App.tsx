import * as React from 'react';
import { useState, useEffect } from 'react';

import ReactDOM from 'react-dom';
import useStorage from './functions/useStorage';

import DragToolbar from './elements/DragToolbar';
import FirstLaunch from './elements/FirstLaunch';

import './styles/router.scss'; 
import { ElectronProps } from './types/index';

const App = () => {
    const [ options, setOptions ] = useState<ElectronProps>({
        firstRun: false,
        incognito: false
    });
    
    useEffect(() => {
        let url = new URLSearchParams(window.location.search);
        setOptions(JSON.parse(url.get('props')));
    }, []);

    return (
        <div className="router dark-theme">
            <DragToolbar/>
            
            {options.firstRun && <FirstLaunch options={options} setOptions={setOptions}/>}

            <div>  werteytuj</div>
        </div>
    );
}

ReactDOM.render(<App/>, document.getElementById('root'));