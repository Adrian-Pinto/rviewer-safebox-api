import Ajv from 'ajv';

const ajv = new Ajv();

const schema = {
  type: 'object',
  properties: {
    id: {
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
    'id',
    'boxName',
    'boxPassword',
    'boxContentId',
  ],
};

export default ajv.compile(schema);
