import React, { useState } from 'react';
// @ts-ignore
import { useSpring, animated } from 'react-spring';
import useLanguage from '../../../functions/useLanguage';

import Buttons from './Buttons';

import WelcomePage from './pages/WelcomePage';
import LastPage from './pages/LastPage';
import Appearance from './pages/Appearance';

import '~/src/styles/installation/elements/FirstLaunch.scss';

const FirstLaunch = ({ setDarkTheme }: {
    setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const pages = [
        <></>,
        <WelcomePage/>,
        <Appearance setDarkTheme={setDarkTheme}/>,
        <LastPage/>
    ];

    const lang = useLanguage();
    const [ page, setPage ] = useState<number>(0);

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
        <animated.div className="FirstLaunch">
            <animated.div className="FirstLaunch__logo-container" style={{ transform: ContainerTransform }}>
                <animated.img src={lang.LOGO} className="FirstLaunch__logo" style={{ height: LogoHeight }}/>
                <animated.h1 style={{ opacity: TextOpacity }}>{lang.NAME} </animated.h1>
            </animated.div>
            
            <animated.div className="FirstLaunch__router" style={pageAnimation}>
                {pages[page]}
            </animated.div>

            <Buttons page={page} setPage={setPage} allPages={pages.length}/>
        </animated.div>
    )
}

export default FirstLaunch;