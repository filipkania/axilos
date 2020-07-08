const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const path = require('path');
const { app } = require('electron');

const useStorage = (database = "options") => {

    const adapter = new FileSync(path.join(app.getPath("appData"), "/axilos/", `${database.toLowerCase()}.json`));
    const db = low(adapter);

    let def = require(`../storage/${database.toLowerCase()}.json`);
    db.defaults(def).write();

    return db;
}

module.exports = useStorage;