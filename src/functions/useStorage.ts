import Lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

import path from 'path';
const { app } = window.require('electron').remote;

const useStorage = (database:String) => {

    const adapter = new FileSync(path.join(app.getPath("appData"), "/axilos/", `${database.toLowerCase()}.json`));
    const db = Lowdb(adapter);

    let def = require(`../electron/storage/${database.toLowerCase()}.json`);
    db.defaults(def).write();

    return db;
}

export default useStorage;