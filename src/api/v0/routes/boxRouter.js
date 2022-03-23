import Router from 'express';
import boxController from '../controllers/boxController.js';
import authorizeUser from '../middlewares/authorizeUser.js';

const boxRouter = Router();

boxRouter
  .route('/')
  .post(boxController.postNewBox);

boxRouter
  .route('/:boxId/items')
  .all(authorizeUser)
  .get(boxController.getBoxItemsById)
  .put(boxController.putNewBoxItemById);

export default boxRouter;
