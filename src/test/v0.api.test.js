import { describe } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
// todo - import testing db
// todo - import API

chai.use(chaiHttp);

describe('Testing v0 endpoints', () => {
  describe('Given: POST call on /v0/safebox', () => {
    describe(`When: Request header includes name: String
        * : Request header includes password: String`, () => {
      it(`Then: Response code 200
            * : Response description equal to "Safebox correctly created"
            * :  JSON with key id: String`, () => {

      });
    });

    describe('When: Request header includes existing safebox name', () => {
      it(`Then: Response code 409
            * : Response description 'Safebox already exists'`, () => {

      });
    });

    describe('When: Request header missing name or password', () => {
      it(`Then: Response code 422
            * : Response description 'Malformed expected data'`, () => {

      });
    });
    describe('When: Occurs an API error', () => {
      it(`Then: Response code 500
            * : Response description 'Unexpected API error'`, () => {

      });
    });
  });

  describe('Given: GET call on /v0/safebox/{id}/items', () => {
    describe(`When: Safebox id exists
        * : Password in Auth header is correct`, () => {
      it(`Then: Response code 200
            * : Response description 'Safebox contents correctly retrieved'
            * : Response JSON with array of stored items`, () => {

      });
    });
    describe(`When: Safebox id exist
       But: Password in header is incorrect`, () => {
      it(`Then: Response code 401
            * : Response description 'Specified Basic Auth does not match'`, () => {

      });
    });
    describe('When: Safebox id not exist', () => {
      it(`Then: Response code 404
            * : Response description 'Request safebox does not exist'`, () => {

      });
    });
    describe('When: Request header auth is missing', () => {
      it(`Then: Response code 422
            * : Response description 'Malformed expected data'`, () => {

      });
    });
    describe('When: Occurs an API error', () => {
      it(`Then: Response code 500
            * : Response description 'Unexpected API error'`, () => {

      });
    });
  });

  describe('Given: PUT call on /v0/safebox/{id}/items', () => {
    describe(`When: Safebox id exist
        * : Password in Auth header is correct
        * : Request body is valid`, () => {
      it(`Then: Response code 200
            * : Response description 'Content correctly added to the safebox'
            * : Now in database {id}.items array have x more items`, () => {

      });
    });
    describe(`When: Safebox id exists
       But: Password in Auth header is incorrect`, () => {
      it(`Then: Response code 401
            * : Response description 'Specified Basic Auth does not match'`, () => {

      });
    });
    describe('When: Safebox id not exist', () => {
      it(`Then: Response code 404
            * : Response description 'Requested safebox does not exist'`, () => {

      });
    });
    describe(`When: Safebox id exist
        * : Password in Auth header is correct
       But: Request body is invalid`, () => {
      it(`Then: Response code 422
            * : Response description 'Malformed expected data'`, () => {

      });
    });
    describe('When: Occurs an API error', () => {
      it(`Then: Response code 500
            * : Response description 'Unexpected API error'`, () => {

      });
    });
  });
});
