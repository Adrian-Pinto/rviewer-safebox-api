import boxSchema from '../models/boxModel.js';
import doHash from '../../../utils/doHash.js';

export default async (req, res, next) => {
  const { boxId } = req.params;
  const { authorization } = req.headers;
  const password = Buffer.from(
    authorization?.split(' ')[1].toString() || '',
    'base64',
  ).toString('ascii').split(':')[1];

  if (!authorization && !boxSchema({ boxId, password })) return next({ status: 422, message: 'Malformed expected data' });

  const isBox = req.services.getDatabase().data.boxes.find((box) => box.id === boxId);

  if (!isBox) return next({ status: 404, message: 'Requested safebox does not exist' });

  const hashPassword = doHash(password);

  if (hashPassword !== isBox.password) return next({ status: 401, message: 'Specified Basic Auth does not match' });

  req.boxObject = isBox;
  next();
};
