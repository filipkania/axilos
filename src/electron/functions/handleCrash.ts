import { BrowserWindow } from "electron";

export default (_:any, { error }: { error: Error }) => {
    let allWindows = BrowserWindow.getAllWindows();

    console.log(error.toString(), typeof error);

    allWindows.forEach(w => w.close());
}