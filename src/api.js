import { stdout } from 'process';
import https from 'https';
import express from 'express';
import servicesInjector from './api/v0/middlewares/servicesInjector.js';
import boxRouter from './api/v0/routes/boxRouter.js';

const initAPI = ({ cert, port, services }) => {
  const api = express();

  api.disable('x-powered-by');

  api.use(express.json());

  api.use(servicesInjector(services));
  // test path
  api.use('/', (req, res) => {
    const { services: { getConnection } } = req;
    console.log(getConnection());
    res.send('Hello world');
  });
  api.use('/safebox', boxRouter);

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
