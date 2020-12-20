const { expect } = require('chai');
const { app, chai, knex } = require('./setup');
const { clearDb } = require('./util');

describe('casinos', () => {
  before(async () => {
    await clearDb(knex);
  })

  describe('GET', () => {
    const casino = { name: 'fake-casino'}    

    before(async () => {
      await knex.insert(casino).into('casino');
    })

    it('should succeed', (done) => {
      chai.request(app)
        .get('/casinos')
        .end((_err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.satisfyApiSpec;
          expect(res.body.casinos).to.deep.equal([{ id: 1, ...casino}]);
          done();
        })
    })
  })
})