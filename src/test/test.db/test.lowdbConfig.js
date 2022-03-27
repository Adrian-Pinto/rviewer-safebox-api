import { Low, Memory } from 'lowdb';

let database;

const createConnection = async () => {
  database = new Low(new Memory());

  await database.read();
  database.data ||= {
    boxes: [],
    boxContent: [],
  };
  await database.write();
};

const getDatabase = () => database;

export {
  createConnection,
  getDatabase,
};
