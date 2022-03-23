import { LowSync, MemorySync } from 'lowdb';

let database;

const createConnection = () => {
  database = new LowSync(new MemorySync('./src/test/test.db/test.db.json'));

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
