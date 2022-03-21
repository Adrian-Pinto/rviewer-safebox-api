import getNewId from '../../../utils/getNewId.js';
import { encryptString, decryptString } from '../../../utils/ciphString.js';
import doHash from '../../../utils/doHash.js';
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

  services.getDatabase().write();

  res.status(200).send({ id: boxId });
};

const getBoxItemsById = (req, res) => {

};

const putNewBoxItemById = (req, res) => {

};

export default {
  postNewBox,
  getBoxItemsById,
  putNewBoxItemById,
};
