import React, { useEffect } from 'react';
import { ElectronProps } from '../../types/index';
// @ts-ignore
import { observer } from 'mobx-react';

import View from './View/View';
import Toolbar from './Toolbar/Toolbar';

import '../../styles/elements/Browser.scss';

const Browser = observer(({ options }: {
    options: ElectronProps
}) => {

    useEffect(() => {

    }, []);

    return (
        <div className="Browser">
            <div className="toolbar">
                <Toolbar/>
            </div>
            <div className="content">
                <View/>
            </div>
        </div>
    );
})

export default Browser;