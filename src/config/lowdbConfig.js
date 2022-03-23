import { Low, JSONFile } from 'lowdb';

let database;

const createConnection = async () => {
  database = await new Low(new JSONFile('./database/db.json'));

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
