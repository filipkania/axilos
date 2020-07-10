import React from 'react';
// @ts-ignore
import { useSpring, animated } from 'react-spring';

import ArrowIcon from './ArrowIcon';
import { ButtonsProps } from '../../types/index';

import useLanguage from '../../functions/useLanguage';
import useStorage from '../../functions/useStorage';

import { ipcRenderer } from 'electron';

const Buttons = ({ page, setPage, allPages, setDisplay, display }: ButtonsProps) => {
    const lang = useLanguage();
    const storage = useStorage('options');
    const { transform, opacity } = useSpring({
        transform: (page === 0) ? 'translateX(-50px)' : 'translateX(0px)',
        opacity: (page === 0) ? 0 : 1
    });

    return (
        <animated.div className="Buttons" style={{ transform }}>
            <animated.div className="Buttons__b prev" style={{ opacity }} onClick={() => page !== 0 && setPage(s => --s)}>
                <ArrowIcon/>
                <span>{lang.BUTTONS.PREV}</span>
            </animated.div>

            <div className="Buttons__b next" onClick={() => {
                if (page === allPages - 1 && display === true) {
                    setDisplay(false);

                    ipcRenderer.send('verification-completed', '');

                    return; 
                }
                
                setPage(s => ++s)
            }}>
                <ArrowIcon/>
                <span>{ page === allPages - 1 ? lang.BUTTONS.LETS_START : lang.BUTTONS.NEXT}</span>
            </div>
        </animated.div>
    );
}

export default Buttons;
