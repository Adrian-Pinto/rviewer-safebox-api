import { describe } from 'mocha';
import chai, { expect } from 'chai';
import fs from 'fs';
import dotenv from 'dotenv';
import chaiHttp from 'chai-http';
import { createConnection, getDatabase } from './test.db/test.lowdbConfig.js';
import initAPI from '../initApi.js';

chai.use(chaiHttp);

dotenv.config();
createConnection();

const api = initAPI({
  port: 3443,
  services: { getDatabase },
  cert: {
    key: fs.readFileSync('./src/test/test.cert/api.key', 'utf8'),
    crt: fs.readFileSync('./src/test/test.cert/api.crt', 'utf8'),
  },
});

describe('Testing v0 endpoints', () => {
  describe('Given: POST call on /v0/safebox', () => {
    describe(`When: Request header includes name: String
        * : Request header includes password: String`, () => {
      it(`Then: Response code 200
            * : Response description equal to "Safebox correctly created"
            * :  JSON with key id: String`, (done) => {
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

    describe('When: Request header includes existing safebox name', () => {
      it(`Then: Response status 409
            * : Response text 'Safebox already exist'`, (done) => {
        chai.request(api)
          .post('/safebox')
          .send({
            name: 'test-safebox',
            password: 'AA@01abcQW12',
          })
          .end((err, res) => {
            expect(res).to.have.status(409);
            expect(res.text).to.be.equal('Safebox already exist');
            done();
          });
      });
    });

    describe('When: Request header missing name or password', () => {
      it(`Then: Response status 422
            * : Response text 'Malformed expected data'`, (done) => {
        chai.request(api)
          .post('/safebox')
          .send({
            name: 'other-safebox',
            password: '',
          })
          .end((err, res) => {
            expect(res).to.have.status(422);
            expect(res.text).to.be.equal('Malformed expected data');
            done();
          });
      });
    });
    describe('When: Occurs an API error', () => {
      it.skip('Then: Response code 500', () => {
        // todo - mock error
      });
    });
  });

  describe('Given: GET call on /v0/safebox/{id}/items', () => {
    describe(`When: Safebox id exists
        * : Password in Auth header is correct`, () => {
      it(`Then: Response code 200
            * : Response JSON with array of stored items`, (done) => {
        // todo - make some placeholder data in test db
        chai.request(api)
          .get('/safebox/fakeId/items')
          .auth('', 'supersecurepass')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res).body.should.be.a('array');
            done();
          });
      });
    });
    describe(`When: Safebox id exist
       But: Password in header is incorrect`, () => {
      it('Then: Response code 401', (done) => {
        // todo - make some placeholder data in test db
        chai.request(api)
          .get('/safebox/fakeId/items')
          .auth('', 'notsupersecurepass')
          .end((err, res) => {
            expect(res).to.have.status(401);
            done();
          });
      });
    });
    describe('When: Safebox id not exist', () => {
      it(`Then: Response code 404
            * : Response description 'Request safebox does not exist'`, (done) => {
        chai.request(api)
          .get('/safebox/unexistId/items')
          .auth('', 'supersecurepass')
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res).body.should.be.equal('Request safebox does not exist');
            done();
          });
      });
    });
    describe('When: Request header auth is missing', () => {
      it(`Then: Response code 422
            * : Response description 'Malformed expected data'`, (done) => {
        // todo - make some placeholder data in test db
        chai.request(api)
          .get('/safebox/fakeId/items')
          .end((err, res) => {
            expect(res).to.have.status(422);
            expect(res).body.should.be.equal('Malformed expected data');
            done();
          });
      });
    });
    describe('When: Occurs an API error', () => {
      it.skip(`Then: Response code 500
            * : Response description 'Unexpected API error'`, () => {
        // todo - mock error
      });
    });
  });

  describe('Given: PUT call on /v0/safebox/{id}/items', () => {
    describe(`When: Safebox id exist
        * : Password in Auth header is correct
        * : Request body is valid`, () => {
      // todo - before() store length of db.boxContent['id'].items.length
      it(`Then: Response code 200
            * : Response description 'Content correctly added to the safebox'
            * : Now in database {id}.items array have x more items`, (done) => {
        chai.request(api)
          .put('/safebox/fakeId/items')
          .auth('', 'supersecurepass')
          .send({
            items: [
              'item1',
              'item2',
            ],
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            // expect(db.boxContent['1234'].items.length).should.be.above(lastLengthValue);
            done();
          });
      });
    });
    describe(`When: Safebox id exists
       But: Password in Auth header is incorrect`, () => {
      it(`Then: Response code 401
            * : Response description 'Specified Basic Auth does not match'`, (done) => {
        chai.request(api)
          .put('/safebox/fakeId/items')
          .auth('', 'notsupersecurepass')
          .send({
            items: [
              'item1',
              'item2',
            ],
          })
          .end((err, res) => {
            expect(res).to.have.status(401);
            done();
          });
      });
    });
    describe('When: Safebox id not exist', () => {
      it(`Then: Response code 404
            * : Response description 'Requested safebox does not exist'`, (done) => {
        chai.request(api)
          .put('/safebox/unexistId/items')
          .auth('', 'supersecurepass')
          .send({
            items: [
              'item1',
              'item2',
            ],
          })
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
      });
    });
    describe(`When: Safebox id exist
        * : Password in Auth header is correct
       But: Request body is invalid`, () => {
      it(`Then: Response code 422
            * : Response description 'Malformed expected data'`, (done) => {
        chai.request(api)
          .put('/safebox/fakeId/items')
          .auth('', 'supersecurepass')
          .send({ items: 'NotValidData' })
          .end((err, res) => {
            expect(res).to.have.status(422);
            done();
          });
      });
    });
    describe('When: Occurs an API error', () => {
      it.skip(`Then: Response code 500
            * : Response description 'Unexpected API error'`, () => {
        // todo - mock error
      });
    });
  });
});
