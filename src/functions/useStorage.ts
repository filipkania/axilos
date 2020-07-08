const low = window.require('lowdb');
const FileSync = window.require('lowdb/adapters/FileSync');

const path = window.require('path');
const { app } = window.require('electron').remote;

const useStorage = (database:String) => {

    const adapter = new FileSync(path.join(app.getPath("appData"), "/axilos/", `${database.toLowerCase()}.json`));
    const db = low(adapter);

    let def = window.require(`../electron/storage/${database.toLowerCase()}.json`);
    db.defaults(def).write();

    return db;
}

export default useStorage;