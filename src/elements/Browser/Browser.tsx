import React, { useRef, useEffect, useState } from 'react';
import { ElectronProps } from '../../types/index';
import { observer } from 'mobx-react';

import View from './View/View';
import Toolbar from './Toolbar/Toolbar';

import '../../styles/elements/Browser.scss';

let tabs = [
    {
        address: "https://google.com"
    },
    {
        address: "https://github.com"
    }
];

const Browser = observer(({ options }: {
    options: ElectronProps
}) => {

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