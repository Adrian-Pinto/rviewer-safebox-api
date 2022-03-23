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
  );
};

const getBoxItemsById = ({ boxObject }, res) => {
  console.log(boxObject);

  // recovery boxContent by id
  // decryptItems = boxContentItems.map -> decrypt(item)
  // response status 200 send {[decryptItems]}

  res.status(200).send('ok');
};

const putNewBoxItemById = ({ boxObject, body: { items } }, res) => {
  console.log(boxObject);
  console.log(items);

  console.log(itemsModel(items));

  // if (!verifi body.items) -> return next({ status: 422 mesage: 'Malformed expected data' })
  // recovery boxContent by id
  // encryptItems = items.map -> encrypt(item)
  // concatenate encrypItems with spread operator
  // boxContent.items = [...boxContent.items, ...encryptItems]
  // await db.write()
  //  done res status 200 send 'Content correctly added to the safebox'
  //  fail return next({ status: 500 mesage: 'Unexpected API error' })

  res.status(200).send('');
};

export default {
  postNewBox,
  getBoxItemsById,
  putNewBoxItemById,
};
