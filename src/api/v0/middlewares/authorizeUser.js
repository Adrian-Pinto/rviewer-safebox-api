import boxSchema from '../models/boxModel.js';
import doHash from '../../../utils/doHash.js';

export default async (req, res, next) => {
  const { boxId } = req.params;
  const { authorization } = req.headers;
  const password = Buffer.from(
    authorization?.split(' ')[1].toString() || '',
    'base64',
  ).toString('ascii').split(':')[1];

  if (!authorization && !boxSchema({ boxId, password })) res.status(422).send('Malformed expected data');

  const isBox = req.services.getConnection().find((box) => box.id === boxId);

  if (!isBox) res.satus(404).send('Requested safebox does not exist');

  const hashPassword = doHash(password);

  if (hashPassword !== isBox.password) res.status(401).send('Specified Basic Auth does not match');

  req.boxObject = isBox;
  next();
};
