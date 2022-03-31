const postNewBox = ({ services, body: { name, password } }, res, next) => {
  // trimPassword = password.trim();
  // trimName = name.trim();
  // isPasswordStrong -> REGeX.test(trimPassword)
  // isName -> !!trimName.length;

  // if (!(isPasswordStrong && isName)) return next({status 422, message:'Malformed expected data'})

  // isBox = services.getDatabase().data.boxes.find((box) => box.name === name);

  // if(isBox) return next({ status 409, message: 'Safebox already exist' })

  // boxId = getNewId();
  // boxContentId = getNewId();

  /**
   * services db push boxes. {
   *  id
   *  name
   *  timesTryToOpen: 0
   *  isLocked: false
   *  password: doHash(trimPassword)
   *  boxContentId
   * }
   */

  /**
   * services db push boxes. {
   *  id: boxContentId
   *  items: []
   * }
   */

  // async write db
  //   then -> res 200 json { id: boxId }
  //   catch -> next(error)

  console.log('postNewBox');
  res.send(200);
};

const openBoxById = ({ services, boxObject }, res, next) => {
/*
  const { id, isLocked, timesTryToOpen } = boxObject;

  isLocked = (timesTryToOpen >= 3);

  if (isLocked) return next({ status: 423, message: 'Requested safeboxis locked' })

  const payLoad = { id };

  const token = jwt.sign(payLoad, process.env.TOKEN_SECRET);

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
