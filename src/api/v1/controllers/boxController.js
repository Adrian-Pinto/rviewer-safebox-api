import jwt from 'jsonwebtoken';
import getNewId from '../../../utils/getNewId.js';
import doHash from '../../../utils/doHash.js';

const postNewBox = ({ services, body: { name, password } }, res, next) => {
  const trimPassword = password?.trim();
  const trimName = name?.trim();
  const isPasswordStrong = /(?=(.*[A-Z]){2,})(?=(.*[!@#$&*]){1,})(?=(.*[0-9]){2,})(?=(.*[a-z]){3,}).{12,}/.test(trimPassword);
  const isName = !!trimName?.length;

  if (!(isPasswordStrong && isName)) return next({ status: 422, message: 'Malformed expected data' });

  const isBox = services.getDatabase().data.boxes.find((box) => box.name === trimName);

  if (isBox) return next({ status: 409, message: 'Safebox already exist' });

  const boxId = getNewId();
  const boxContentId = getNewId();

  services.getDatabase().data.boxes.push({
    id: boxId,
    name: trimName,
    timesTryToOpen: 0,
    isLocked: false,
    password: doHash(trimPassword),
    boxContentId,
  });

  services.getDatabase().data.boxContent.push({
    id: boxContentId,
    items: [],
  });

  (async () => services.getDatabase().write())()
    .then(() => res.status(200).json({ id: boxId }))
    .catch((error) => next(error));
};

const openBoxById = ({ services, boxObject }, res, next) => {
/*
  const { id, isLocked, timesTryToOpen } = boxObject;

  isLocked = (timesTryToOpen >= 3);

  if (isLocked) return next({ status: 423, message: 'Requested safeboxis locked' })

  const payLoad = { id };

  const token = jwt.sign(payLoad, process.env.TOKEN_SECRET);
  jwt.sign({
  data: 'foobar'
}, process.env.TOKEN_SECRET, { expiresIn: '3m' });

  res.status(200).json({token})
*/
  console.log('openBox');
  res.send(200);
};

const getBoxItemsById = ({ services, boxObject }, res, next) => {
/*
  const { isLocked, boxContentId } = boxObject;

  if (isLocked) return next({ status: 423, message: 'Requested safebox is locked' })

  const isBox = services.getDatabase().data.boxContent.find(
    (box) => boxContentId === box.id)
  )

  if (!isBox) return next({ status 500, message: 'Unexpected API error' })

  const decryptItems = isBox.items.map((item) => decryptString(item));

  res.status(200).send({ items: decryptItems })

*/
  console.log('getBoxItems');
  res.send(200);
};

const putNewBoxItemById = ({ services, boxObject, body: { items } }, res, next) => {
/*
  if (!itemsModel(items)) return next { status: 422, message: 'Malformed expected data'}

  const { isLocked, boxContentId } = boxObject;

  if (isLocked) return next({ status: 423, message: Requested safebox is locked });

  const isBox = services.getDatabase().data.boxContent.find(
    (box) => boxContentId === box.id)

  if (!isBox) return next({ status: 500, message: 'Unexpected API error' })

  const encryptedItems = items.map((item) => encryptString(item));

  isBox.items = [...isBox.items, ...encryptedItems];

  (async () => services.getDatabase().write())()
    .then(() => res.status(200).send('Content correctly added to the safebox'))
    .catch((error) => next(error));
  )
*/
  console.log('putBoxItems');
  res.send(200);
};

export default {
  postNewBox,
  openBoxById,
  getBoxItemsById,
  putNewBoxItemById,
};
