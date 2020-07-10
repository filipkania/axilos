import { Language } from '../types/language';
import { getLogo, getName } from '../functions/getNameAndLogo';

const pl:Language = {
    TEST_LANGUAGE: "polska kurka",
    
    LOGO: getLogo(),
    NAME: getName(),

    BUTTONS: {
        NEXT: "Dalej",
        PREV: "Wróć",
        LETS_START: "Rozpocznij"
    },

    INSTALLATION: {
        APPEARANCE: {
            DARK: "Ciemny",
            LIGHT: "Jasny",
            SYSTEM: "Automatycznie",

            TITLE: "Wygląd"
        }
    }
}

export default pl;