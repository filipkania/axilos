import React from 'react';
import { remote } from 'electron';

import '~/src/styles/installation/elements/WindowsButtons.scss';

const WindowsButtons = () => {
    const currentWindow = remote.getCurrentWindow();
    return (
        <div className="WindowsButtons">
            <div className="minimize" onClick={() => currentWindow.minimize()}>
                {"\uE921"}
            </div>
            { currentWindow.isMaximizable && 
                <div className="maximize" onClick={() => currentWindow.isMaximized() ? currentWindow.unmaximize() : currentWindow.maximize()}>
                    {currentWindow.isMaximized() ? "\uE923" : "\uE922"}
                </div> }
            <div className="close" onClick={() => currentWindow.close()}>
                {"\uE8BB"}
            </div>
        </div>
    );
}
 
export default WindowsButtons;