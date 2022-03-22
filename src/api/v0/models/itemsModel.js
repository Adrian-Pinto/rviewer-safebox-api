import Ajv from 'ajv';

const ajv = new Ajv();

const schema = {
  type: 'object',
  properties: {
    initVector: {
      type: 'string',
    },
    ciphedString: {
      type: 'string',
    },
    authTag: {
      type: 'string',
    },
  },
  required: [
    'initVector',
    'ciphedString',
    'authTag',
  ],
};

export default ajv.compile(schema);
