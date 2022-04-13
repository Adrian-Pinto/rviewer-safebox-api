import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const encryptString = (stringToEncrypt) => {
  const initVector = randomBytes(16).toString('hex');
  const cipher = createCipheriv(
    process.env.CIPHER_ALGORITHM,
    Buffer.from(process.env.SECRET, 'hex'),
    initVector,
  );
  const ciphedString = Buffer.concat([
    cipher.update(stringToEncrypt),
    cipher.final(),
  ]).toString('hex');

  return {
    initVector,
    ciphedString,
    authTag: cipher.getAuthTag().toString('hex'),
  };
};

const decryptString = ({ initVector, ciphedString, authTag }) => {
  const decipher = createDecipheriv(
    process.env.CIPHER_ALGORITHM,
    Buffer.from(process.env.SECRET, 'hex'),
    initVector,
  ).setAuthTag(Buffer.from(authTag, 'hex'));

  return Buffer.concat([
    decipher.update(Buffer.from(ciphedString, 'hex')),
    decipher.final(),
  ]).toString('utf8');
};

export {
  encryptString,
  decryptString,
};
