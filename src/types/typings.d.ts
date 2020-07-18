///<reference path="../../node_modules/electron/electron.d.ts" />
///<reference path="../../node_modules/react-spring/index.d.ts" />
///<reference path="../../node_modules/mobx-react/dist/index.d.ts" />


declare module "*.png" {
    const content: string;
    export default content;
}

declare module "*.svg" {
    const content: string;
    export default content;
}