import { Language } from '../types/language';
import { getLogo, getName } from '../functions/getNameAndLogo';

const en:Language = {
    TEST_LANGUAGE: "hi!",
    
    LOGO: getLogo(),
    NAME: getName(),

    BUTTONS: {
        NEXT: "Next",
        PREV: "Back",
        LETS_START: "Let's start!"
    }
}

export default en;