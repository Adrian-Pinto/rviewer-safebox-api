import Ajv from 'ajv';

const ajv = new Ajv();

/**
 * BoxId
 * BoxName
 * BoxPassword regex: (?=(.*[A-Z]){2,})(?=(.*[!@#$&*]){1,})(?=(.*[0-9]){2,})(?=(.*[a-z]){3,}).{12,}
 * BoxContentId
 */

const schema = {
  type: 'object',
  properties: {
    boxId: {
      type: 'string',
    },
    boxName: {
      type: 'string',
    },
    boxPassword: {
      type: 'string',
    },
    boxContentId: {
      type: 'string',
    },
  },
  required: [
    'boxId',
    'boxPassword',
  ],
};

export default ajv.compile(schema);
