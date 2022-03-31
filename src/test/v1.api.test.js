import { describe } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import dotenv from 'dotenv';
import { createConnection, getDatabase } from './test.db/test.lowdbConfig.js';
import initAPI from '../initApi.js';
import errorHandler from '../utils/errorHandler.js';

dotenv.config();

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
          .post('/v1/safebox')
          .send({
            name: 'testv1_box',
            password: 'AA@01abcQW12',
          }).end((err, res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body).to.have.own.property('id').that.is.a('String');
            done();
          });
      });
    });
    describe('When: Request body includes existing safebox name', () => {
      it(`Then: Response status 409
            * : Response text 'Safebox already exist'`, (done) => {
        chai.request(api)
          .post('/v1/safebox')
          .send({
            name: 'testv1_box',
            password: 'AA@01abcQW12',
          }).then(() => {
            chai.request(api)
              .post('/v1/safebox')
              .send({
                name: 'testv1_box',
                password: 'AA@01abcQW12',
              }).end((err, res) => {
                expect(res.status).to.be.equal(409);
                expect(res.text).to.be.equal('Safebox already exist');
                done();
              });
          });
      });
    });
    describe('When: Request body missing name or password', () => {
      it(`Then: Response status 422
            * : Response text 'Malformed expected data'`, (done) => {
        chai.request(api)
          .post('/v1/safebox')
          .send()
          .end((err, res) => {
            expect(res.status).to.be.equal(422);
            expect(res.text).to.be.equal('Malformed expected data');
            done();
          });
      });
    });
    describe('When: Request missing endpoint', () => {
      it(`Then: Response status 404
            * : Response text 'Requested endpoint does not exist'`, (done) => {
        chai.request(api)
          .post('/v1/unexistEndpoint')
          .send()
          .end((err, res) => {
            expect(res.status).to.be.equal(404);
            expect(res.text).to.be.equal('Requested endpoint does not exist');
            done();
          });
      });
    });
    describe('When: Occurs an unknown API error', () => {
      it(`Then: Response status 500
            * : Response text 'Unexpected API error'`, (done) => {
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
  describe('Given: GET call on /v1/safebox/{id}/open', () => {
    describe(`When: Safebox id exist
        * : Auth header is correct`, () => {
      it(`Then: Response status 200
            * : JSON with key token: String`, (done) => {
        chai.request(api)
          .post('/v1/safebox')
          .send({
            name: 'testv1_box',
            password: 'AA@01abcQW12',
          }).then(({ body: { id } }) => {
            chai.request(api)
              .get(`/v1/safebox/${id}/open`)
              .auth('testv1_box', 'AA@01abcQW12')
              .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body).to.have.own.property('token').that.is.a('string');
                done();
              });
          });
      });
    });
    describe('When: Safebox id not exist', () => {
      it(`Then: Response status 404
            * : Response text 'Requested safebox does not exist'`, (done) => {
        chai.request(api)
          .get('/v1/safebox/unexistId/open')
          .auth('testv1_box', 'AA@01abcQW12')
          .end((err, res) => {
            expect(res.status).to.be.equal(404);
            expect(res.text).to.be.equal('Requested safebox does not exist');
            done();
          });
      });
    });
    describe(`When: Safebox id exist
        But: Auth header is missing`, () => {
      it(`Then: Response status 422
            * : Response text 'Malformed expected data'`, (done) => {
        chai.request(api)
          .post('/v1/safebox')
          .send({
            name: 'testv1_box',
            password: 'AA@01abcQW12',
          }).then(({ body: { id } }) => {
            chai.request(api)
              .get(`/v1/safebox/${id}/open`)
              .end((err, res) => {
                expect(res.status).to.be.equal(422);
                expect(res.text).to.be.equal('Malformed expected data');
                done();
              });
          });
      });
    });
    describe(`When: Safebox id exist
        But: Safebox is locked`, () => {
      it(`Then: Response status 423
            * : Response text 'Requested safebox is locked'`, (done) => {
        chai.request(api)
          .post('/v1/safebox')
          .send({
            name: 'testv1_box',
            password: 'AA@01abcQW12',
          }).then(({ body: { id } }) => {
            getDatabase().data.boxes.id.isLocked = true;

            chai.request(api)
              .get(`/v1/safebox/${id}/open`)
              .auth('testv1_box', 'AA@01abcQW12')
              .end((err, res) => {
                expect(res.status).to.be.equal(423);
                expect(res.text).to.be.equal('Request safebox is locked');
              });
          });
        done();
      });
    });
    describe('When: Occurs an unknown API error', () => {
      it.skip(`Then: Response status 500
            * : Response text 'Unexpectted API error'`, (_done) => {

      });
    });
  });
  describe('Given: GET call on /v1/safebox/{id}/items', () => {
    describe(`When: Safebox id exist
        * : Auth token is correct`, () => {
      it(`Then: Response status 200
            * : Response JSON with items Array`, (done) => {
        chai.request(api)
          .post('/v1/safebox')
          .send({
            name: 'testv1_box',
            password: 'AA@01abcQW12',
          })
          .then(({ body: { id } }) => {
            chai.request(api)
              .get(`/v1/safebox/${id}/open`)
              .auth('testv1_box', 'AA@01abcQW12')
              .then(({ body: { token } }) => {
                chai.request(api)
                  .get(`/v1/safebox/${id}/items`)
                  .auth(token, { type: 'bearer' })
                  .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.have.own.property('items').that.is.a('array');
                    done();
                  });
              });
          });
      });
    });
    describe(`When: Safebox id exist
        But: Auth token is not valid`, () => {
      it(`Then: Response status 401
            * : Response text 'Specified token does not match'`, (done) => {
        chai.request(api)
          .post('/v1/safebox')
          .send({
            name: 'testv1_box',
            password: 'AA@01abcQW12',
          })
          .then(({ body: { id } }) => {
            chai.request(api)
              .get(`/v1/safebox/${id}/open`)
              .auth('testv1_box', 'AA@01abcQW12')
              .then(({ body: { _token } }) => {
                chai.request(api)
                  .get(`/v1/safebox/${id}/items`)
                  .auth('notValid', { type: 'bearer' })
                  .send()
                  .end((err, res) => {
                    expect(res.status).to.be.equal(401);
                    expect(res.text).to.be.equal('Specified token does not match');
                    done();
                  });
              });
          });
      });
    });
    describe('When: Safebox id not exist', () => {
      it(`Then: Response status 404
            * : Response text 'Requested safebox does not exist'`, (done) => {
        chai.request(api)
          .get('/v1/safebox/unexistId/items')
          .auth('ValidToken', { type: 'bearer' })
          .end((err, res) => {
            expect(res.status).to.be.equal(404);
            expect(res.text).to.be.equal('Requested safebox does not exist');
            done();
          });
      });
    });
    describe(`When: Safebox exist
        But: Auth header is missing`, () => {
      it(`Then: Response status 422
            * : Response text 'Malformed expected data'`, (done) => {
        chai.request(api)
          .post('/v1/safebox')
          .send({
            name: 'testv1_box',
            password: 'AA@01abcQW12',
          })
          .then(({ body: { id: secondId } }) => {
            chai.request(api)
              .post('/v1/safebox')
              .send({
                name: 'test2v1_box',
                password: 'AA@01abcQW12',
              })
              .then(({ body: { id } }) => {
                chai.request(api)
                  .get(`/v1/safebox/${id}/open`)
                  .auth('testv1_box', 'AA@01abcQW12')
                  .then(({ body: { token } }) => {
                    chai.request(api)
                      .get(`/v1/safebox/${secondId}/items`)
                      .auth(token, { type: 'bearer' })
                      .send({
                        items: [
                          'item0',
                          'item1',
                        ],
                      })
                      .end((err, res) => {
                        expect(res.status).to.be.equal(422);
                        expect(res.text).to.be.equal('Malformed expected data');
                        done();
                      });
                  });
              });
          });
      });
    });
    describe(`When: Safebox id exist
       But: Safebox is locked`, () => {
      it(`Then: Response status 423
            * : Response text 'Requested safebox is locked'`, (done) => {
        chai.request(api)
          .post('/v1/safebox')
          .send({
            name: 'testv1_box',
            password: 'AA@01abcQW12',
          })
          .then(({ body: { id } }) => {
            chai.request(api)
              .get(`/v1/safebox/${id}/open`)
              .auth('testv1_box', 'AA@01abcQW12')
              .then(({ body: { token } }) => {
                getDatabase().data.boxes.id.isLoked = true;

                chai.request(api)
                  .get(`/v1/safebox/${id}/items`)
                  .auth(token, { type: 'bearer' })
                  .end((err, res) => {
                    expect(res.status).to.be.equal(423);
                    expect(res.text).to.be.equal('Requested safebox is locked');
                  });
              });
          });
        done();
      });
    });
    describe('When: Occurs an unknown API error', () => {
      it.skip(`Then: Response status 500
            * : Response text 'Unexpected API error'`, (_done) => {

      });
    });
  });
  describe('Given: PUT call on /v1/safebox/{id}/items', () => {
    describe(`When: Safebox id exist
       * : Auth header token is valid
       * : Request body is a valid items Array`, () => {
      it(`Then: Response status 200
            * : Response text 'Content correctly added to the safebox'`, (done) => {
        chai.request(api)
          .post('/v1/safebox')
          .send({
            name: 'testv1_box',
            password: 'AA@01abcQW12',
          })
          .then(({ body: { id } }) => {
            chai.request(api)
              .get(`/v1/safebox/${id}/open`)
              .auth('testv1_box', 'AA@01abcQW12')
              .then(({ body: { token } }) => {
                chai.request(api)
                  .put(`/v1/safebox/${id}/items`)
                  .auth(token, { type: 'bearer' })
                  .send({
                    items: [
                      'item0',
                      'item1',
                    ],
                  })
                  .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.text).to.be.equal('Content correctly added to the safebox');
                    expect(getDatabase().data.boxContent[0].items.length).to.be.equal(2);
                    done();
                  });
              });
          });
      });
    });
    describe(`When: Safebox id exist
       But: Auth header is not valid`, () => {
      it(`Then: Response status 401
            * : Response text 'Specified token does not match'`, (done) => {
        chai.request(api)
          .post('/v1/safebox')
          .send({
            name: 'testv1_box',
            password: 'AA@01abcQW12',
          })
          .then(({ body: { id } }) => {
            chai.request(api)
              .get(`/v1/safebox/${id}/open`)
              .auth('testv1_box', 'AA@01abcQW12')
              .then(({ body: { _token } }) => {
                chai.request(api)
                  .put(`/v1/safebox/${id}/items`)
                  .auth('notValid', { type: 'bearer' })
                  .send({
                    items: [
                      'item0',
                      'item1',
                    ],
                  })
                  .end((err, res) => {
                    expect(res.status).to.be.equal(401);
                    expect(res.text).to.be.equal('Specified token does not match');
                    done();
                  });
              });
          });
      });
    });
    describe('When: Safebox id not exist', () => {
      it(`Then: Response status 404
            * : Response text 'Requested safebox does not exist'`, (done) => {
        chai.request(api)
          .put('/v1/safebox/unexistId/items')
          .end((err, res) => {
            expect(res.status).to.be.equal(404);
            expect(res.text).to.be.equal('Requested safebox does not exist');
            done();
          });
      });
    });
    describe(`When: Safebox id exist
        But: Request body is not a valid items Array`, () => {
      it(`Then: Response status 422
            * : Response text 'Malformed expected data'`, (done) => {
        chai.request(api)
          .post('/v1/safebox')
          .send({
            name: 'testv1_box',
            password: 'AA@01abcQW12',
          })
          .then(({ body: { id } }) => {
            chai.request(api)
              .get(`/v1/safebox/${id}/open`)
              .auth('testv1_box', 'AA@01abcQW12')
              .then(({ body: { token } }) => {
                chai.request(api)
                  .put(`/v1/safebox/${id}/items`)
                  .auth(token, { type: 'bearer' })
                  .send({
                    items: [
                    ],
                  })
                  .end((err, res) => {
                    expect(res.status).to.be.equal(422);
                    expect(res.text).to.be.equal('Malformed expected data');
                    done();
                  });
              });
          });
      });
    });
    describe(`When: Safebox id exist
       But: Safebox is locked`, () => {
      it(`Then: Response status 423
            * : Response text 'Requested safebox is locked'`, (done) => {
        chai.request(api)
          .post('/v1/safebox')
          .send({
            name: 'testv1_box',
            password: 'AA@01abcQW12',
          })
          .then(({ body: { id } }) => {
            chai.request(api)
              .get(`/v1/safebox/${id}/open`)
              .auth('testv1_box', 'AA@01abcQW12')
              .then(({ body: { token } }) => {
                getDatabase().data.boxes.id.isLocked = true;

                chai.request(api)
                  .put(`/v1/safebox/${id}/items`)
                  .auth(token, { type: 'bearer' })
                  .send({
                    items: [
                      'item0',
                      'item1',
                    ],
                  })
                  .end((err, res) => {
                    expect(res.status).to.be.equal(423);
                    expect(res.text).to.be.equal('Requested safebox is locked');
                  });
              });
          });
        done();
      });
    });
    describe('When: Occurs an unknown API error', () => {
      it.skip(`Then: Response status 500
            * : Response text 'Unexpected API error'`, (_done) => {

      });
    });
  });
});
