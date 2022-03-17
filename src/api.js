import { stdout } from 'process';
import https from 'https';
import express from 'express';

const initAPI = ({ cert, port, services }) => {
  const api = express();

  api.disable('x-powered-by');

  api.use(express.json());

  api.use('/', (req, res) => res.send('Hello world'));

  https.createServer({
    key: cert.key,
    cert: cert.crt,
  }, api)
    .listen(
      port,
      () => stdout.write(`Server runing on port ${port}\n`),
    );
};

export default initAPI;
