import { ipcRenderer } from "electron";
import React from "react";

class ErrorBoundary extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
  
    componentDidCatch = (error: Error) => ipcRenderer.send('overlay-crashed', { error })
  
    render = () => this.props.children
}

export default ErrorBoundary;