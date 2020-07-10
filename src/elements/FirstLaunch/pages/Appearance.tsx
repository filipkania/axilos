import React, { useEffect, useState } from 'react';
import useLanguage from '../../../functions/useLanguage';

import LightTheme from '../../../../public/img/Axilos_appearance_light-theme.png';
import DarkTheme from '../../../../public/img/Axilos_appearance_dark-theme.png';
import LightThemeNightly from '../../../../public/img/Axilos_nightly_appearance_light-theme.png';
import DarkThemeNightly from '../../../../public/img/Axilos_nightly_appearance_dark-theme.png';

import useStorage from '../../../functions/useStorage';

const isDev = process.env.NODE_ENV === 'development';

const Button = ({ img, span, onClick, selected }: {
    img: string,
    span: string,
    onClick: (event: any) => void,
    selected: boolean
}) => (
    <div className="Appearance__button" data-selected={selected.toString()} onClick={onClick}>
        <img src={img}/>
        <span>{span}</span>
    </div>
)


const Appearance = ({ darkTheme, setDarkTheme }:{
    setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>
    darkTheme: boolean
}) => {
    const lang = useLanguage();
    const storage = useStorage("options");
    const storageDarkTheme = storage.get('user.options.darkTheme').value();
    const systemDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
    const [ themeStatus, setThemeStatus ] = useState<any>(storageDarkTheme);

    useEffect(() => {
        storage.set('user.options.darkTheme', themeStatus).write();
    }, [ themeStatus ]);

    return (
        <div className="Appearance">
            <h1 className="title">
                {lang.INSTALLATION.APPEARANCE.TITLE}
            </h1>
            <div className="content">
                <Button img={isDev ? LightThemeNightly : LightTheme} span={lang.INSTALLATION.APPEARANCE.LIGHT} selected={themeStatus === "false"} onClick={_ => { setDarkTheme(false); setThemeStatus("false"); }}/>
                <Button img={isDev ? DarkThemeNightly : DarkTheme} span={lang.INSTALLATION.APPEARANCE.DARK} selected={themeStatus === "true"} onClick={_ => { setDarkTheme(true); setThemeStatus("true"); }}/>

                { systemDarkTheme.media !== "not all" &&
                    <Button 
                        img={
                            isDev ? 
                                systemDarkTheme.matches ? DarkThemeNightly : LightThemeNightly
                                : systemDarkTheme.matches ? DarkTheme : LightTheme
                        }
                        selected={themeStatus === "system"}
                        span={lang.INSTALLATION.APPEARANCE.SYSTEM} 
                        onClick={_ => { setDarkTheme(systemDarkTheme.matches); setThemeStatus("system") }}/>
                }

            </div>
        </div>
    );
}

export default Appearance;