import { stdout } from 'process';
import https from 'https';
import express from 'express';
import servicesInjector from './api/v0/middlewares/servicesInjector.js';
import errorHandler from './utils/errorHandler.js';
import boxRouter from './api/v0/routes/boxRouter.js';

const initAPI = ({ cert, port, services }) => {
  const api = express();

  api.disable('x-powered-by');

  api.use(express.json());

  api.use(servicesInjector(services));

  api.use('/safebox', boxRouter);

  // todo - notFoundHandler
  api.use(errorHandler);

  https.createServer({
    key: cert.key,
    cert: cert.crt,
    ca: cert.ca,
    rejectUnauthorized: false,
  }, api)
    .listen(
      port,
      () => stdout.write(`Server runing on port ${port}\n`),
    );

  return api;
};

export default initAPI;
