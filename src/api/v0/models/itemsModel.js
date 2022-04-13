import Ajv from 'ajv';

const ajv = new Ajv();

const schema = {
  type: 'array',
  items: {
    type: 'string',
  },
  minItems: 1,
};

export default ajv.compile(schema);
