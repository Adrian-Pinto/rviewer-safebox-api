import Router from 'express';
import boxController from '../controllers/boxController.js';
import authorizeUser from '../middlewares/authorizeUser.js';

const boxRouter = Router();

boxRouter
  .route('/')
  .post(boxController.createBox);

boxRouter
  .route('/safebox/:boxId/items')
  .all(authorizeUser)
  .get(boxController.getBoxById)
  .put(boxController.putBoxById);

export default boxRouter;
