import dotenv from 'dotenv';
import { stdout } from 'process';
import fs from 'fs';
import https from 'https';
import initAPI from './src/initApi.js';
import { createConnection, getDatabase } from './src/config/lowdbConfig.js';

dotenv.config();

const PORT = process.env.PORT || 3001;

createConnection();

https.createServer({
  key: fs.readFileSync('./src/cert/api.key', 'utf8'),
  cert: fs.readFileSync('./src/cert/api.crt', 'utf8'),
  rejectUnauthorized: false,
}, initAPI({
  services: { getDatabase },
})).listen(
  PORT,
  () => stdout.write(`Server runing on port ${PORT}\n`),
);
