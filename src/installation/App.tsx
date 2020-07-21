import * as React from 'react';

import ReactDOM from 'react-dom';

import FirstLaunch from './elements/FirstLaunch/FirstLaunch';
import ErrorBoundary from '../overlay/elements/ErrorBoundary';

import '../styles/index.scss'; 
import useTheme from '../functions/useTheme';

const App = () => {
    const [ darkTheme, setDarkTheme ] = useTheme();

    return (
        <div className="router" dark-theme={darkTheme.toString()}>
            <FirstLaunch setDarkTheme={setDarkTheme}/>
        </div>
    );
}

ReactDOM.render(<ErrorBoundary><App/></ErrorBoundary>, document.getElementById('root')); 