import { Language } from '../types/language';
import { logo, name } from '../constants/info';

const pl:Language = {
    TEST_LANGUAGE: "polska kurka",
    
    LOGO: logo,
    NAME: name,

    BUTTONS: {
        NEXT: "Dalej",
        PREV: "Wróć",
        LETS_START: "Rozpocznij"
    },

    INSTALLATION: {
        APPEARANCE: {
            DARK: "Ciemny",
            LIGHT: "Jasny",
            SYSTEM: "Automatyczny",

            TITLE: "Wygląd"
        }
    }
}

export default pl;