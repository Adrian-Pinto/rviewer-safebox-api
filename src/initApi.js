import express from 'express';
import servicesInjector from './api/v0/middlewares/servicesInjector.js';
import errorHandler from './utils/errorHandler.js';
import notFoundHandler from './utils/notFoundHandler.js';
import betaBoxRouter from './api/v0/routes/boxRouter.js';
import v1BoxRouter from './api/v1/routes/boxRouter.js';

const initAPI = ({ services }) => {
  const api = express();

  api.disable('x-powered-by');

  api.use(express.json());

  api.use(servicesInjector(services));

  api.use('/v0/safebox', betaBoxRouter);
  api.use('/v1/safebox', v1BoxRouter);

  api.use(notFoundHandler);

  api.use(errorHandler);

  return api;
};

export default initAPI;
