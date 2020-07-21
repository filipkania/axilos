import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import '../../styles/index.scss'; 
import '../../styles/errorwindow/errorwindow.scss';
import useTheme from '../../functions/useTheme';
import useLanguage from '../../functions/useLanguage';
import { remote, shell } from 'electron';

const App = () => {
    const [ darkTheme ] = useTheme();
    const [ error, setError ] = useState<string>(null);
    const lang = useLanguage();

    useEffect(() => {
        setError(window.location.search.replace('?error=', ''));
    }, []);

    return (
        <div className="router" dark-theme={darkTheme.toString()}>
            <div className="Error">
                <img src={lang.LOGO}/>
                <span className="Error__title">{lang.NAME}</span>

                <h3>{lang.ERROR.ERROR_OCCURED}</h3>

                <span>{lang.ERROR.REPORT_ERROR}</span>
                <a href="#" onClick={() => shell.openExternal(lang.ERROR.ISSUES_URL)}>{lang.ERROR.ISSUES_URL}</a>

                {error && <div className="Error__textarea" onClick={(e) => {
                    window.getSelection().selectAllChildren(e.currentTarget);
                    document.execCommand('copy');
                }}>
                    {decodeURIComponent(error)}
                </div>}

                <div className="Error__button" onClick={() => remote.app.exit()}>
                    {lang.ERROR.CLOSE}
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(<App/>, document.getElementById('root')); 