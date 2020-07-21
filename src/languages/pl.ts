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
    },

    ERROR: { 
        CLOSE: "Zamknij",
        ERROR_OCCURED: "Wystąpił nieoczekiwany błąd", 
        REPORT_ERROR: "Axilos jest open-source'owym projektem, dlatego przydało by się abyś zgłosił ten błąd pod tym adresem:",
        ISSUES_URL: "https://github.com/filipkania/axilos/issues"
    }
}

export default pl;