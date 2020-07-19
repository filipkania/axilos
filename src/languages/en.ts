import { Language } from '../types/language';
import { logo, name } from '../constants/info';

const en:Language = {
    TEST_LANGUAGE: "hi!",
    
    LOGO: logo,
    NAME: name,

    BUTTONS: {
        NEXT: "Next",
        PREV: "Back",
        LETS_START: "Let's start!"
    },

    INSTALLATION: {
        APPEARANCE: {
            DARK: "Dark",
            LIGHT: "Light",
            SYSTEM: "Automatically",

            TITLE: "Appearance"
        }
    }
}

export default en;