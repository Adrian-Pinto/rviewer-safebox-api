import dotenv from 'dotenv';
import fs from 'fs';
import initAPI from './src/initApi.js';
import { createConnection, getDatabase } from './src/config/lowdbConfig.js';

dotenv.config();

const PORT = process.env.PORT || 3001;

const key = fs.readFileSync('./src/cert/api.key', 'utf8');
const crt = fs.readFileSync('./src/cert/api.crt', 'utf8');

createConnection();

initAPI({
  port: PORT,
  services: { getDatabase },
  cert: {
    key,
    crt,
  },
});
