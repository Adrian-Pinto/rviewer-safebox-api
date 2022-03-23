import Ajv from 'ajv';

const ajv = new Ajv();

const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    items: {
      type: 'array',
    },
  },
  required: [
    'id',
    'items',
  ],
};

export default ajv.compile(schema);
