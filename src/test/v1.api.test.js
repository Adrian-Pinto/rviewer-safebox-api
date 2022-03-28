import { describe } from 'mocha';

describe('testing v1 endpoints', () => {
  describe('Given: POST call on /v1/safebox', () => {
    describe(`When: Request body includes name: String
    * : Request body includes password: String`, () => {
      it(`Then: Response status 200
      * : JSON with key id: String`, () => {

      });
    });
    describe('When: Request body includes existing safebox name', () => {
      it(`Then: Response status 409
      * : Response text 'Safebox already exists'`, () => {

      });
    });
    describe('When: Request body missing name or password', () => {
      it(`Then: Response status 422
      * : Response text 'Malformed expected data'`, () => {

      });
    });
    describe('When: Request missing endpoint', () => {
      it(`Then: Response status 404
      * : Response text 'Unexpected API error'`, () => {

      });
    });
    describe('When: Occurs an unknown API error', () => {
      it(`Then: Response status 500
      * : Response text 'Unexpected API error'`, () => {

      });
    });
  });
  describe('Given: GET call on /v1/safebox/{id}/open', () => {
    describe(`When: Safebox id exist
    * : Auth header is correct`, () => {
      it(`Then: Response status 200
      * : JSON with key token: String`, () => {

      });
    });
    describe('When: Safebox id not exist', () => {
      it(`Then: Response status 404
      * : Response text 'Requested safebox does not exist'`, () => {

      });
    });
    describe(`When: Safebox id exist
    But: Auth header is missing`, () => {
      it(`Then: Response status 422
      * : Response text 'Malformed expected data'`, () => {

      });
    });
    describe(`When: Safebox id exist
    * : Safebox is locked`, () => {
      it(`Then: Response status 423
    * : Response text 'Requested safebox is locked'`, () => {

      });
    });
    describe('When: Occurs an unknown API error', () => {
      it(`Then: Response status 500
      * : Response text 'Unexpectted API error'`, () => {

      });
    });
  });
  describe('Given: GET call on /v1/safebox/{id}/items', () => {
    describe(`When: Safebox id exist
    * : Auth token is correct`, () => {
      it(`Then: Response status 200
    * : Response JSON with items Array`, () => {

      });
    });
    describe(`When: Safebox id exist
    But: Auth token is not valid`, () => {
      it(`Then: Response status 401
      * : Response text 'Specified token does not match'`, () => {

      });
    });
    describe('When: Safebox id not exist', () => {
      it(`Then: Response status 404
      * : Response text 'Requested safebox does not exist'`, () => {

      });
    });
    describe(`When: Safebox exist
    But: Auth header is missing`, () => {
      it(`Then: Response status 422
      * : Response text 'Malformed expected data'`, () => {

      });
    });
    describe(`When: Safebox id exist
    But: Safebox is locked`, () => {
      it(`Then: Response status 423
      * : Response text 'Requested safebox is locked'`, () => {

      });
    });
    describe('When: Occurs an unknown API error', () => {
      it(`Then: Response status 500
      * : Response text 'Unexpected API error'`, () => {

      });
    });
  });
  describe('Given: PUT call on /v1/safebox/{id}/items', () => {
    describe(`When: Safebox id exist
    * : Auth header token is valid
    * : Request body is a valid items Array`, () => {
      it(`Then: Response status 200
    * : Response text 'Content correctly added to the safebox'`, () => {

      });
    });
    describe(`When: Safebox id exist
    But: Auth header is not valid`, () => {
      it(`Then: Response status 401
      * : Response text 'Specified token does not match'`, () => {

      });
    });
    describe('When: Safebox id not exist', () => {
      it(`Then: Response status 404
      * : Response text 'Requested safebox does not exist'`, () => {

      });
    });
    describe(`When: Safebox id exist
    But: Request body is not a valid items Array`, () => {
      it(`Then: Response status 422
      * : Response text 'Malformed expected data'`, () => {

      });
    });
    describe(`When: Safebox id exist
    But: Safebox is locked`, () => {
      it(`Then: Response status 423
      * : Response text 'Requested safebox is locked'`, () => {

      });
    });
    describe('When: Occurs an unknown API error', () => {
      it(`Then: Response status 500
      * : Response text 'Unexpected API error'`, () => {

      });
    });
  });
});
