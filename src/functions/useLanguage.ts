import useStorage from './useStorage';
import { Language } from '../types/language';

const useLanguage = (): Language => {
    const storage = useStorage("options");
    let preferedLang:String = storage.get('user.lang').value(),
        lang;

    if (preferedLang === undefined)
        preferedLang = navigator.language;

    try {
        lang = require(`../languages/${preferedLang}`);
    }catch(_) {
        lang = require(`../languages/en`);
    }

    return lang.default;
}

export default useLanguage;