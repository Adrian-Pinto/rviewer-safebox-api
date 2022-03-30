import express from 'express';
import servicesInjector from './api/v0/middlewares/servicesInjector.js';
import errorHandler from './utils/errorHandler.js';
import notFoundHandler from './utils/notFoundHandler.js';
import boxRouter from './api/v0/routes/boxRouter.js';

const initAPI = ({ services }) => {
  const api = express();

  api.disable('x-powered-by');

  api.use(express.json());

  api.use(servicesInjector(services));

  api.use('/safebox', boxRouter);

  api.use(notFoundHandler);

  api.use(errorHandler);

  return api;
};

export default initAPI;
