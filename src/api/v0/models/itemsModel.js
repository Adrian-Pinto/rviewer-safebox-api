import Ajv from 'ajv';

const ajv = new Ajv();

const schema = {
  type: 'array',
  items: {
    type: 'string',
  },
  minItems: 2,
};

export default ajv.compile(schema);
