import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import useLanguage from '../functions/useLanguage';
import { ElectronProps } from '../types/index';

import Logo from '../../public/img/axilos_logo.png';

import '../styles/elements/FirstLaunch.scss';

const FirstLaunch = ({ options, setOptions }: {
    options: ElectronProps,
    setOptions: React.Dispatch<React.SetStateAction<ElectronProps>>
}) => {
    const lang = useLanguage();
    const [ display, setDisplay ]:any = useState(true); 
    const props:any = useSpring({ 
        transform: display ? `translate3d(0,0%,0)` : `translate3d(0,-10%,0)`,
        opacity: display ? 1 : 0,
        onRest: () => {
            if (!display) 
                setOptions({
                    ...options,
                    firstRun: false
                });
                // DONT UPDATE SETTINGS HERE, IT MUST BE DONE ON LAST BUTTON CLICK
        }
    }); 
    
    return (
        <animated.div className="FirstLaunch" style={props}>
            {lang.TEST_LANGUAGE}
            <button onClick={() => setDisplay(false) && alert('test')}>ad</button>
        </animated.div>
    )
}

export default FirstLaunch;