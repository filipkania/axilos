///<reference path="../../node_modules/electron/electron.d.ts" />
///<reference path="../../node_modules/react-spring/index.d.ts" />
///<reference path="../../node_modules/react-electron-webview/index.d.ts" />

export interface ElectronProps {
    firstRun: boolean;
    incognito: boolean;
}

export interface ButtonsProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    allPages: number;
    setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    display: boolean;
}