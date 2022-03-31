export const basicAuth = ({ params: { boxId }, headers: { authorization } }, res, next) => {
  /*
  const trimPassword = Buffer.from(
    authorization?.split(' ')[1].toString() || '',
    'base64',
  ).toString('ascii').split(:)[1].trim();

  if (!authorization && !boxSchema({ boxId, trimPassword })) retrun next({ status: 422, message: 'Malformed expected data' })

  const isBox = req.services.getDatabase().data.boxes.find((box) => box.id === boxId);

  if (!isBox) return next({ status: 404, message: 'Requested safebox does not exist' });

  const hashPassword = doHash(trimPassword);

  if (hashPassword !== isBox.password) return next({ status:422, message: 'Malformed expected data' });

  req.boxObject = isBox;
  next();
  */
  console.log('basic auth');
  next();
};

export const tokenAuth = (req, res, next) => {
  /*
  const {authorization} = req.headers;
  const token = authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

  if(!token && !decodedToken.id) return next({ status: 401, message: 'Specified token does not match' });

  const {boxId} = req.params;

  if(decodedToken.id !== boxId ) return next({ status: 422, message: 'Malformed expected data' });

  const isBox = req.services.getDatabase().data.boxes.find(
    (box) => box.id === boxId
  )

  is (!isBox) return next({ status: 404, message: 'Requested safebox does not match' });

  req.boxObject = isBox;
  next();
  */
  console.log('tokenAuth');
  next();
};
