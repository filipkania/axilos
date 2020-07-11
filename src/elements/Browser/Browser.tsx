import React from 'react';
import { ElectronProps } from '../../types/index';

const Browser = ({ options }: {
    options: ElectronProps
}) => {
    return (
        <div className="Browser">
            <div className="">
                <webview src="https://google.com"/>
            </div>
        </div>
    );
}

export default Browser;