import * as React from 'react';
import { useState, useEffect } from 'react';

import ReactDOM from 'react-dom';

import DragToolbar from './elements/DragToolbar';
import FirstLaunch from './elements/FirstLaunch/FirstLaunch';
import Browser from './elements/Browser/Browser';


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
    }, []);

    useEffect(() => {
        const darkSetting:String = storage.get('user.options.darkTheme').value();

        const handleThemeChange:EventListener = (e:any) => {
            storage.get('user.options.darkTheme').value() === 'system' && setDarkTheme(e.matches)
        };

        if (darkSetting === "system" || darkSetting === null) {
            if (window.matchMedia('(prefers-color-scheme)').media === 'not all') {
                storage.set('user.options.darkTheme', 'false').write();
                setDarkTheme(false);
            } else {
                setDarkTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleThemeChange);
            }
        } else 
            setDarkTheme(darkSetting === 'true');

        return () => window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleThemeChange);;
    }, [ darkTheme ]);

    return (
        <div className="router" dark-theme={darkTheme.toString()}>
            <DragToolbar/>
            
            {options.firstRun && <FirstLaunch options={options} setDarkTheme={setDarkTheme} setOptions={setOptions}/>}

            <Browser options={options}/>
        </div>
    );
}

ReactDOM.render(<App/>, document.getElementById('root')); 