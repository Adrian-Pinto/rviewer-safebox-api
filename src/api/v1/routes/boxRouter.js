import Router from 'express';
import boxController from '../controllers/boxController.js';
import { basicAuth, tokenAuth } from '../middlewares/authorizeUser.js';

const boxRouter = Router();

boxRouter
  .route('/')
  .post(boxController.postNewBox);

boxRouter
  .route('/:id/open')
  .all(basicAuth)
  .get(boxController.openBoxById);

boxRouter
  .route('/:id/items')
  .all(tokenAuth)
  .get(boxController.getBoxItemsById)
  .put(boxController.putNewBoxItemById);

export default boxRouter;
