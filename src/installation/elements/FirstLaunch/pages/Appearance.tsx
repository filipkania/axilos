import React, { useEffect, useState } from 'react';
import useLanguage from '../../../../functions/useLanguage';

import LightTheme from '~/public/img/Axilos_appearance_light-theme.png';
import DarkTheme from '~/public/img/Axilos_appearance_dark-theme.png';
import LightThemeNightly from '~/public/img/Axilos_nightly_appearance_light-theme.png';
import DarkThemeNightly from '~/public/img/Axilos_nightly_appearance_dark-theme.png';

import useStorage from '../../../../functions/useStorage';

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


const Appearance = ({ setDarkTheme, setDisabled }:{
    setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>,
    setDisabled: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const lang = useLanguage();
    const storage = useStorage("options");
    const [ systemThemeStatus, setSTS ] = useState<boolean>(false);
    const [ themeStatus, setThemeStatus ] = useState<string | null>(storage.get('user.options.darkTheme').value());

    useEffect(() => {
        setDisabled(themeStatus === null);

        storage.set('user.options.darkTheme', themeStatus).write();

        return () => setDisabled(false)
    }, [ themeStatus ]);

    useEffect(() => {
        const systemDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
        if (systemDarkTheme.media !== "not all") {
            setSTS(systemDarkTheme.matches);
            const handleChange:EventListener = (e:any) => setSTS(e.matches);
            systemDarkTheme.addEventListener('change', handleChange);
            return () => systemDarkTheme.removeEventListener('change', handleChange);
        }
    }, []);

    return (
        <div className="Appearance">
            <h1 className="title">
                {lang.INSTALLATION.APPEARANCE.TITLE}
            </h1>
            <div className="content">
                <Button img={isDev ? LightThemeNightly : LightTheme} span={lang.INSTALLATION.APPEARANCE.LIGHT} selected={themeStatus === "false"} onClick={_ => { setDarkTheme(false); setThemeStatus("false"); }}/>
                <Button img={isDev ? DarkThemeNightly : DarkTheme} span={lang.INSTALLATION.APPEARANCE.DARK} selected={themeStatus === "true"} onClick={_ => { setDarkTheme(true); setThemeStatus("true"); }}/>

                { window.matchMedia('(prefers-color-scheme)').media !== "not all" &&
                    <Button 
                        img={
                            isDev ? 
                                systemThemeStatus ? DarkThemeNightly : LightThemeNightly
                                : systemThemeStatus ? DarkTheme : LightTheme
                        }
                        selected={themeStatus === "system"}
                        span={lang.INSTALLATION.APPEARANCE.SYSTEM} 
                        onClick={_ => { setDarkTheme(systemThemeStatus); setThemeStatus("system") }}/>
                }

            </div>
        </div>
    );
}

export default Appearance;