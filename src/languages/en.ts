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
    },

    ERROR: { 
        CLOSE: "Close",
        ERROR_OCCURED: "Unexpected error occured", 
        REPORT_ERROR: "Axilos is a open-source browser, so you can report this bug under this link:",
        ISSUES_URL: "https://github.com/filipkania/axilos/issues"
    }
}

export default en;