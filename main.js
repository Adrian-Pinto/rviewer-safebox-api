import 'dotenv/config';
import fs from 'fs';
import initAPI from './src/api.js';
// import { createConection, getCon } from './src/config/lowdbConfig';

const PORT = process.env.PORT || 3001;

const key = fs.readFileSync('./src/cert/api.key', 'utf8');
const crt = fs.readFileSync('./src/cert/api.crt', 'utf8');

// createConection();

initAPI({
  port: PORT,
  services: null,
  cert: {
    key,
    crt,
  },
});
