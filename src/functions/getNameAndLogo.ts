import Logo from '../../public/img/axilos_logo_512.png';
import LogoNightly from '../../public/img/axilos_logo_nightly_512.png';

let isDev:boolean = process.env.NODE_ENV === "development";

export const getLogo:Function = ():any => isDev ? LogoNightly : Logo; 
export const getName:Function = ():String => isDev ? "Axilos Nightly" : "Axilos";