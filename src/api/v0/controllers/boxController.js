import getNewId from '../../../utils/getNewId.js';
import doHash from '../../../utils/doHash.js';
import { encryptString, decryptString } from '../../../utils/ciphString.js';
import itemsModel from '../models/itemsModel.js';
// import boxContentSchema

const postNewBox = ({ services, body: { name, password } }, res, next) => {
  const isPasswordStrong = /(?=(.*[A-Z]){2,})(?=(.*[!@#$&*]){1,})(?=(.*[0-9]){2,})(?=(.*[a-z]){3,}).{12,}/.test(password);
  const isName = !!name.trim().length;
  const isPassword = !!password.trim().length;

  if (!(isPasswordStrong && isName && isPassword)) return next({ status: 422, message: 'Malformed expected data' });

  const isBox = services.getDatabase().data.boxes.find((box) => box.boxName === name);

  if (isBox) return next({ status: 409, message: 'Safebox already exist' });

  const boxId = getNewId();
  const boxContentId = getNewId();

  // todo - build object out and validate with models before push then on db
  //   !  - if validate fails return status 500 message Unexpected API error
  services.getDatabase().data.boxes.push({
    id: boxId,
    boxName: name,
    boxPassword: doHash(password),
    boxContentId,
  });

  services.getDatabase().data.boxContent.push({
    id: boxContentId,
    items: [],
  });

  (async () => {
    const result = await services.getDatabase().write();
    return result;
  })().then(
    res.status(200).send({ id: boxId }),
  ).catch((error) => next(error));
};

const getBoxItemsById = ({ boxObject }, res) => {
  console.log(boxObject);

  // recovery boxContent by id
  // decryptItems = boxContentItems.map -> decrypt(item)
  // response status 200 send {[decryptItems]}

  res.status(200).send('ok');
};

const putNewBoxItemById = ({ services, boxObject, body: { items } }, res, next) => {
  if (!itemsModel(items)) return next({ status: 422, message: 'Malformed expected data' });

  const isBox = services.getDatabase().data.boxContent.find(
    (box) => boxObject.boxContentId === box.id,
  );

  if (!isBox) return next({ status: 500, message: 'Unexpected API error' });

  const encryptedItems = items.map((item) => encryptString(item));

  isBox.items = [...isBox.items, ...encryptedItems];

  (async () => {
    const result = await services.getDatabase().write();
    return result;
  })()
    .then(() => res.status(200).send('Content correctly added to the safebox'))
    .catch((error) => next(error));
};

export default {
  postNewBox,
  getBoxItemsById,
  putNewBoxItemById,
};
