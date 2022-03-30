import { describe } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { createConnection, getDatabase } from './test.db/test.lowdbConfig.js';
import initAPI from '../initApi.js';
import errorHandler from '../utils/errorHandler.js';

chai.use(chaiHttp);

createConnection();

const api = initAPI({
  services: { getDatabase },
});

describe('testing v1 endpoints', () => {
  beforeEach('reset bd', () => {
    getDatabase().data = {
      boxes: [],
      boxContent: [],
    };
  });

  describe('Given: POST call on /v1/safebox', () => {
    describe(`When: Request body includes name: String
    * : Request body includes password: String`, () => {
      it(`Then: Response status 200
      * : JSON with key id: String`, (done) => {
        chai.request(api)
          .post('/safebox')
          .send({
            name: 'test-safebox',
            password: 'AA@01abcQW12',
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.own.property('id').that.is.a('string');
            done();
          });
      });
    });
    describe('When: Request body includes existing safebox name', () => {
      it.skip(`Then: Response status 409
      * : Response text 'Safebox already exists'`, (done) => {

      });
    });
    describe('When: Request body missing name or password', () => {
      it.skip(`Then: Response status 422
      * : Response text 'Malformed expected data'`, (done) => {

      });
    });
    describe('When: Request missing endpoint', () => {
      it.skip(`Then: Response status 404
      * : Response text 'Unexpected API error'`, (done) => {

      });
    });
    describe('When: Occurs an unknown API error', () => {
      it.skip(`Then: Response status 500
      * : Response text 'Unexpected API error'`, (done) => {

      });
    });
  });
  describe('Given: GET call on /v1/safebox/{id}/open', () => {
    describe(`When: Safebox id exist
    * : Auth header is correct`, () => {
      it.skip(`Then: Response status 200
      * : JSON with key token: String`, (done) => {

      });
    });
    describe('When: Safebox id not exist', () => {
      it.skip(`Then: Response status 404
      * : Response text 'Requested safebox does not exist'`, (done) => {

      });
    });
    describe(`When: Safebox id exist
    But: Auth header is missing`, () => {
      it.skip(`Then: Response status 422
      * : Response text 'Malformed expected data'`, (done) => {

      });
    });
    describe(`When: Safebox id exist
    * : Safebox is locked`, () => {
      it.skip(`Then: Response status 423
    * : Response text 'Requested safebox is locked'`, (done) => {

      });
    });
    describe('When: Occurs an unknown API error', () => {
      it.skip(`Then: Response status 500
      * : Response text 'Unexpectted API error'`, (done) => {

      });
    });
  });
  describe('Given: GET call on /v1/safebox/{id}/items', () => {
    describe(`When: Safebox id exist
    * : Auth token is correct`, () => {
      it.skip(`Then: Response status 200
    * : Response JSON with items Array`, (done) => {

      });
    });
    describe(`When: Safebox id exist
    But: Auth token is not valid`, () => {
      it.skip(`Then: Response status 401
      * : Response text 'Specified token does not match'`, (done) => {

      });
    });
    describe('When: Safebox id not exist', () => {
      it.skip(`Then: Response status 404
      * : Response text 'Requested safebox does not exist'`, (done) => {

      });
    });
    describe(`When: Safebox exist
    But: Auth header is missing`, () => {
      it.skip(`Then: Response status 422
      * : Response text 'Malformed expected data'`, (done) => {

      });
    });
    describe(`When: Safebox id exist
    But: Safebox is locked`, () => {
      it.skip(`Then: Response status 423
      * : Response text 'Requested safebox is locked'`, (done) => {

      });
    });
    describe('When: Occurs an unknown API error', () => {
      it.skip(`Then: Response status 500
      * : Response text 'Unexpected API error'`, (done) => {

      });
    });
  });
  describe('Given: PUT call on /v1/safebox/{id}/items', () => {
    describe(`When: Safebox id exist
    * : Auth header token is valid
    * : Request body is a valid items Array`, () => {
      it.skip(`Then: Response status 200
    * : Response text 'Content correctly added to the safebox'`, (done) => {

      });
    });
    describe(`When: Safebox id exist
    But: Auth header is not valid`, () => {
      it.skip(`Then: Response status 401
      * : Response text 'Specified token does not match'`, (done) => {

      });
    });
    describe('When: Safebox id not exist', () => {
      it.skip(`Then: Response status 404
      * : Response text 'Requested safebox does not exist'`, (done) => {

      });
    });
    describe(`When: Safebox id exist
    But: Request body is not a valid items Array`, () => {
      it.skip(`Then: Response status 422
      * : Response text 'Malformed expected data'`, (done) => {

      });
    });
    describe(`When: Safebox id exist
    But: Safebox is locked`, () => {
      it.skip(`Then: Response status 423
      * : Response text 'Requested safebox is locked'`, (done) => {

      });
    });
    describe('When: Occurs an unknown API error', () => {
      it.skip(`Then: Response status 500
      * : Response text 'Unexpected API error'`, (done) => {

      });
    });
  });
});
