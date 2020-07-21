export interface Language {
    
    TEST_LANGUAGE: string;
    
    LOGO: any;
    NAME: string;

    BUTTONS: {
        NEXT: string;
        PREV: string;
        LETS_START: string;
    }

    INSTALLATION: {
        APPEARANCE: {
            DARK: string;
            LIGHT: string;
            SYSTEM: string;

            TITLE: string;
        }
    }

    ERROR: {
        CLOSE: string;
        ERROR_OCCURED: string;
        REPORT_ERROR: string;
        ISSUES_URL: string;
    }
}