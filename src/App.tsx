import * as React from 'react';
import { useState, useEffect } from 'react';

import ReactDOM from 'react-dom';

import DragToolbar from './elements/DragToolbar';
import FirstLaunch from './elements/FirstLaunch/FirstLaunch';

import './styles/index.scss'; 
import { ElectronProps } from './types/index';
import useStorage from './functions/useStorage';

const App = () => {
    const storage = useStorage('options');
    const [ options, setOptions ] = useState<ElectronProps>({
        firstRun: false,
        incognito: false
    });
    const [ darkTheme, setDarkTheme ] = useState<boolean>(false);
    
    useEffect(() => {
        let url = new URLSearchParams(window.location.search);
        setOptions(JSON.parse(url.get('props')));
        
        const darkSetting:String = storage.get('user.options.darkTheme').value();

        if (darkSetting === "system" || darkSetting === null) {
            if (window.matchMedia('(prefers-color-scheme)').media === 'not all') {
                storage.set('user.options.darkTheme', 'false').write();
                setDarkTheme(false);
            } else {
                setDarkTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => setDarkTheme(e.matches));
            }
        } else 
            setDarkTheme(darkSetting === 'true');
    }, []);

    return (
        <div className="router" dark-theme={darkTheme.toString()}>
            <DragToolbar/>
            
            {options.firstRun && <FirstLaunch options={options} darkTheme={darkTheme} setDarkTheme={setDarkTheme} setOptions={setOptions}/>}

            <div>  werteytuj</div>
        </div>
    );
}

ReactDOM.render(<App/>, document.getElementById('root'));