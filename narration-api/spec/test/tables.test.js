const { expect } = require('chai');
const { app, chai, knex } = require('./setup');
const { clearDb } = require('./util');

describe('tables', () => {
  before(async () => {
    await clearDb(knex);
  })

  describe('GET', () => {
    const user = { username: 'fake-casino', hash: 'hash', salt: 'salt'};
    const casino = { name: 'fake-casino'};    
    const table = { bigBlind: 50, smallBlind: 25, casinoId: 1};    

    before(async () => {
      await knex.insert(user).into('user');      
      await knex.insert(casino).into('casino');      
      await knex.insert(table).into('table');
    });

    it('should succeed', (done) => {
      chai.request(app)
        .get('/casinos/1/tables')
        .end((_err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.satisfyApiSpec;
          expect(res.body.tables).to.deep.equal([{id: 1, ...table}]);
          done();
        })
    })
  })
})