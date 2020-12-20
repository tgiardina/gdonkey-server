const { expect } = require('chai');
const { app, chai, knex } = require('./setup');
const { clearDb, getAuthHeader } = require('./util');

describe('games', () => {
  describe('POST', () => {
    const user = { username: 'fake-user', hash: 'hash', salt: 'salt'}    
    const casino = { name: 'fake-casino'};    
    const table = { bigBlind: 50, smallBlind: 25, casinoId: 1};    
    const game = { externalId: "aa11", startedAt: (new Date()).toISOString(), tableId: 1};

    before(async () => {    
      await clearDb(knex);      
      await knex.insert(user).into('user');            
      await knex.insert(casino).into('casino');      
      await knex.insert(table).into('table');
    });

    it('should succeed', (done) => {
      chai.request(app)
        .post('/games')
        .set('authorization', getAuthHeader(1))
        .set('content-type', 'application/json')        
        .send({game})
        .end((_err, res) => {
          expect(res).to.have.status(201);
          expect(res).to.satisfyApiSpec;
          expect(res.body.game).to.deep.equal({ id: 1, witnessId: 1, ...game});
          done();
        })
    })
  })

  describe('PATCH', () => {
    const user = { username: 'fake-user', hash: 'hash', salt: 'salt'}    
    const casino = { name: 'fake-casino'};    
    const table = { bigBlind: 50, smallBlind: 25, casinoId: 1};    
    const game = { externalId: "aa11", startedAt: new Date(), tableId: 1, witnessId: 1};

    before(async () => {    
      await clearDb(knex);
      await knex.insert(user).into('user');            
      await knex.insert(casino).into('casino');      
      await knex.insert(table).into('table');
      await knex.insert(game).into('game');
    });

    it('should succeed', (done) => {
      chai.request(app)
        .patch('/games/`')
        .set('authorization', getAuthHeader(1))
        .set('content-type', 'application/json')        
        .send({ game: {endedAt: new Date(-1).toISOString()}})
        .end((_err, res) => {
          expect(res).to.have.status(204);
          expect(res).to.satisfyApiSpec;
          done();
        })
    })
  })  
})