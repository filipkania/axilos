import React, { useState } from 'react';
import { useSpring,  animated } from 'react-spring';
import useLanguage from '../../functions/useLanguage';
import { ElectronProps } from '../../types/index';

import Buttons from './Buttons';

import WelcomePage from './pages/WelcomePage';
import LastPage from './pages/LastPage';

import '../../styles/elements/FirstLaunch.scss';

const pages = [
    <></>,
    <WelcomePage/>,
    <LastPage/>
];

const FirstLaunch = ({ options, setOptions }: {
    options: ElectronProps,
    setOptions: React.Dispatch<React.SetStateAction<ElectronProps>>
}) => {
    const lang = useLanguage();
    const [ display, setDisplay ] = useState<boolean>(true);
    const [ page, setPage ] = useState<number>(0);
    const props = useSpring({ 
        transform: display ? `translate3d(0,0%,0)` : `translate3d(0,-10%,0)`,
        opacity: display ? 1 : 0,
        onRest: () => {
            if (!display) 
                setOptions({
                    ...options,
                    firstRun: false
                });
        }
    });

    const { transform: ContainerTransform, height: LogoHeight, opacity: TextOpacity} = useSpring({
        transform: page > 0 ? `translateY(-150%)` : `translateY(0%)`,
        opacity: page > 0 ? 0 : 1,
        height: page > 0 ? "50px" : "200px"
    });
    const pageAnimation = useSpring({
        opacity: page > 0 ? 1 : 0,
        delay: 100
    });
    
    return (
        <animated.div className="FirstLaunch" style={props}>
            <animated.div className="FirstLaunch__logo-container" style={{ transform: ContainerTransform }}>
                <animated.img src={lang.LOGO} className="FirstLaunch__logo" style={{ height: LogoHeight }}/>
                <animated.h1 style={{ opacity: TextOpacity }}>{lang.NAME} </animated.h1>
            </animated.div>
            
            <animated.div className="FirstLaunch__router" style={pageAnimation}>
                {pages[page]}
            </animated.div>

            <Buttons page={page} setPage={setPage} allPages={pages.length} setDisplay={setDisplay} display={display}/>
        </animated.div>
    )
}

export default FirstLaunch;