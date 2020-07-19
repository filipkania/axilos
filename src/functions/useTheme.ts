import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import useStorage from './useStorage';

const useTheme = (): [
    boolean,
    Dispatch<SetStateAction<boolean>>
] => {
    const storage = useStorage('options');
    const [ darkTheme, setDarkTheme ] = useState<boolean>(false);

    useEffect(() => {
        const darkSetting:String = storage.get('user.options.darkTheme').value();

        const handleThemeChange:EventListener = (e:any) =>
            storage.get('user.options.darkTheme').value() === 'system' && setDarkTheme(e.matches);

        if (darkSetting === "system" || darkSetting === null) {
            if (window.matchMedia('(prefers-color-scheme)').media === 'not all') {
                storage.set('user.options.darkTheme', 'false').write();
                setDarkTheme(false);
            } else {
                setDarkTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleThemeChange);
            }
        } else 
            setDarkTheme(darkSetting === 'true');

        return () => window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleThemeChange);;
    }, [ darkTheme ]);

    return [ darkTheme, setDarkTheme ];
}

export default useTheme;