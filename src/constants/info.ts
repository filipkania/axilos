import Logo from '../../public/img/axilos_logo_512.png';
import LogoNightly from '../../public/img/axilos_logo_nightly_512.png';

export const isDev:boolean = process.env.NODE_ENV === "development";

export const logo:string = isDev ? LogoNightly : Logo; 
export const name:string = isDev ? "Axilos Nightly" : "Axilos";