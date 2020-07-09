import Lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

import path from 'path';
import { app } from 'electron';

const useStorage = (database = "options") => {

    const adapter = new FileSync(path.join(app.getPath("appData"), "/axilos/", `${database.toLowerCase()}.json`));
    const db = Lowdb(adapter);

    let def = require(`../storage/${database.toLowerCase()}.json`);
    db.defaults(def).write();

    return db;
}

export default useStorage;