import { describe } from 'mocha';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import { createConnection, getDatabase } from './test.db/test.lowdbConfig.js';
import initAPI from '../initApi.js';
import errorHandler from '../utils/errorHandler.js';

chai.use(chaiHttp);

createConnection();

const api = initAPI({
  services: { getDatabase },
});

describe('Testing v0 endpoints', () => {
  beforeEach('reset bd', () => {
    getDatabase().data = {
      boxes: [],
      boxContent: [],
    };
  });

  describe('Given: POST call on /v0/safebox', () => {
    describe(`When: Request body includes name: String
        * : Request body includes password: String`, () => {
      it(`Then: Response status 200
            * :  JSON with key id: String`, (done) => {
        chai.request(api)
          .post('/v0/safebox')
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
      it(`Then: Response status 409
            * : Response text 'Safebox already exist'`, (done) => {
        chai.request(api)
          .post('/v0/safebox')
          .send({
            name: 'test-safebox',
            password: 'AA@01abcQW12',
          })
          .end(() => {
            chai.request(api)
              .post('/v0/safebox')
              .send({
                name: 'test-safebox',
                password: 'AA@01abcQW12',
              }).then((res) => {
                expect(res).to.have.status(409);
                expect(res.text).to.be.equal('Safebox already exist');
              });
          });
        done();
      });
    });
    describe('When: Request body missing name or password', () => {
      it(`Then: Response status 422
            * : Response text 'Malformed expected data'`, (done) => {
        chai.request(api)
          .post('/v0/safebox')
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
    describe('When: Request missing endpoint', () => {
      it(`Then: Response status 404
            * : Response text 'Requested endpoint does not exist'`, (done) => {
        chai.request(api)
          .get('/v0/unexistEndpoint')
          .send()
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.text).to.be.equal('Requested endpoint does not exist');
            done();
          });
      });
    });
    describe('When: Occurs an API error', () => {
      it(`Then: Response code 500
            * : Response description 'Unexpected API error`, (done) => {
        const mockResponse = () => ({
          status: sinon.stub().returnsThis(),
          send: sinon.stub().returnsThis(),
        });

        const res = mockResponse();

        errorHandler(Error(), null, res, null);

        expect(res.status.firstCall.args[0]).to.be.equal(500);
        expect(res.send.firstCall.args[0]).to.be.equal('Unexpected API error');
        done();
      });
    });
  });

  describe('Given: GET call on /v0/safebox/{id}/items', () => {
    describe(`When: Safebox id exists
        * : Password in Auth header is correct`, () => {
      it(`Then: Response code 200
            * : Response JSON with array of stored items`, (done) => {
        chai.request(api)
          .post('/v0/safebox')
          .send({
            name: 'test-safebox',
            password: 'AA@01abcQW12',
          }).end((err, { body: { id } }) => {
            chai.request(api)
              .put(`/v0/safebox/${id}/items`)
              .auth('test-safebox', 'AA@01abcQW12')
              .send({
                items: [
                  'item0',
                  'item1',
                ],
              })
              .then(
                chai.request(api)
                  .get(`/v0/safebox/${id}/items`)
                  .auth('test-safebox', 'AA@01abcQW12')
                  .then((res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.have.own.property('items').that.is.a('array');
                  }),
              );
            done();
          });
      });
    });
    describe(`When: Safebox id exist
       But: Password in header is incorrect`, () => {
      it('Then: Response code 401', (done) => {
        chai.request(api)
          .post('/v0/safebox')
          .send({
            name: 'test-safebox',
            password: 'AA@01abcQW12',
          }).end((err, { body: { id } }) => {
            chai.request(api)
              .get(`/v0/safebox/${id}/items`)
              .auth('test-safebox', '1234')
              .then((res) => {
                expect(res.status).to.be.equal(401);
              });
          });
        done();
      });
    });
    describe('When: Safebox id not exist', () => {
      it(`Then: Response code 404
            * : Response description 'Request safebox does not exist'`, (done) => {
        chai.request(api)
          .get('/v0/safebox/unexistId/items')
          .auth('test-safebox', '1234')
          .then((res) => {
            expect(res.status).to.be.equal(404);
            expect(res.text).to.be.equal('Request safebox does not exist');
          });
        done();
      });
    });
    describe('When: Request header auth is missing', () => {
      it(`Then: Response code 422
            * : Response description 'Malformed expected data'`, (done) => {
        chai.request(api)
          .post('/v0/safebox')
          .send({
            name: 'test-safebox',
            password: 'AA@01abcQW12',
          }).end((err, { body: { id } }) => {
            chai.request(api)
              .get(`/v0/safebox/${id}/items`)
              .then((res) => {
                expect(res.status).to.be.equal(422);
                expect(res.text).to.be.equal('Malformed expected data');
              });
          });
        done();
      });
    });
    describe('When: Occurs an API error', () => {
      it(`Then: Response code 500
            * : Response description 'Unexpected API error'`, (done) => {
        chai.request(api)
          .post('/v0/safebox')
          .send({
            name: 'test-safebox',
            password: 'AA@01abcQW12',
          }).end((err, { body: { id } }) => {
            getDatabase().data.boxContent = [];

            chai.request(api)
              .get(`/v0/safebox/${id}/items`)
              .auth('test-safebox', 'AA@01abcQW12')
              .then((res) => {
                expect(res.status).to.be.equal(500);
                expect(res.text).to.be.equal('Unexpected API error');
              });
          });
        done();
      });
    });
  });

  describe('Given: PUT call on /v0/safebox/{id}/items', () => {
    describe(`When: Safebox id exist
        * : Password in Auth header is correct
        * : Request body is valid`, () => {
      it(`Then: Response code 200
            * : Response description 'Content correctly added to the safebox'
            * : Now in database {id}.items array have x more items`, (done) => {
        chai.request(api)
          .post('/v0/safebox')
          .send({
            name: 'test-safebox',
            password: 'AA@01abcQW12',
          }).end((err, { body: { id } }) => {
            chai.request(api)
              .put(`/v0/safebox/${id}/items`)
              .auth('test-safebox', 'AA@01abcQW12')
              .send({
                items: [
                  'item0',
                  'item1',
                ],
              })
              .then((res) => {
                expect(res.status).to.be.equal(200);
                expect(res.text).to.be.equal('Content correctly added to the safebox');
                expect(getDatabase.data.boxContent.id.items.lenght).to.be.equal(2);
              });
          });
        done();
      });
    });
    describe(`When: Safebox id exists
       But: Password in Auth header is incorrect`, () => {
      it(`Then: Response code 401
            * : Response description 'Specified Basic Auth does not match'`, (done) => {
        chai.request(api)
          .post('/v0/safebox')
          .send({
            name: 'test-safebox',
            password: 'AA@01abcQW12',
          }).end((err, { body: { id } }) => {
            chai.request(api)
              .put(`/v0/safebox/${id}/items`)
              .auth('test-safebox', '1234')
              .send({
                items: [
                  'item0',
                  'item1',
                ],
              })
              .then((res) => {
                expect(res.status).to.be.equal(401);
                expect(res.text).to.be.equal('Specified Basic Auth does not match');
              });
          });
        done();
      });
    });
    describe('When: Safebox id not exist', () => {
      it(`Then: Response code 404
            * : Response description 'Requested safebox does not exist'`, (done) => {
        chai.request(api)
          .put('/v0/safebox/unexistId/items')
          .auth('test-safebox', 'AA@01abcQW12')
          .end((err, res) => {
            expect(res.status).to.be.equal(404);
            expect(res.text).to.be.equal('Requested safebox does not exist');
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
          .post('/v0/safebox')
          .send({
            name: 'test-safebox',
            password: 'AA@01abcQW12',
          }).end((err, { body: { id } }) => {
            chai.request(api)
              .put(`/v0/safebox/${id}/items`)
              .auth('test-safebox', 'AA@01abcQW12')
              .send({
                items: [
                ],
              })
              .then((res) => {
                expect(res.status).to.be.equal(422);
                expect(res.text).to.be.equal('Malformed expected data');
              });
          });
        done();
      });
    });
    describe('When: Occurs an API error', () => {
      it(`Then: Response code 500
            * : Response description 'Unexpected API error'`, (done) => {
        chai.request(api)
          .post('/v0/safebox')
          .send({
            name: 'test-safebox',
            password: 'AA@01abcQW12',
          }).end((err, { body: { id } }) => {
            getDatabase().data.boxContent = [];

            chai.request(api)
              .put(`/v0/safebox/${id}/items`)
              .auth('test-safebox', 'AA@01abcQW12')
              .send({
                items: [
                  'item0',
                ],
              })
              .then((res) => {
                expect(res.status).to.be.equal(500);
                expect(res.text).to.be.equal('Unexpected API error');
              });
          });
        done();
      });
    });
  });
});
