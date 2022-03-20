import 'dotenv/config';
import fs from 'fs';
import initAPI from './src/api.js';
import { createConnection, getDatabase } from './src/config/lowdbConfig.js';

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
