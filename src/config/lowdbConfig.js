import { LowSync, JSONFileSync } from 'lowdb';

let database;

const createConnection = () => {
  database = new LowSync(new JSONFileSync('./database/db.json'));

  database.read();
  database.data ||= {
    boxes: [],
    boxContent: [],
  };
  database.write();
};

const getDatabase = () => database;

export {
  createConnection,
  getDatabase,
};
