const { expect } = require('chai');
const { app, chai, knex } = require('./setup');
const { clearDb, generateGame, getAuthHeader } = require('./util');

describe('seats', () => {
  describe('POST', () => {
    const player = { username: 'fake-player', casinoId: 1, witnessId: 1};        
    const seat = { position: 0, stack: 1500, gameId: 1, playerId: 1 };

    before(async () => {    
      await clearDb(knex);      
      await generateGame(knex);
      await knex('player').insert(player);      
    });

    it('should succeed', (done) => {
      chai.request(app)
        .post('/seats')
        .set('authorization', getAuthHeader(1))
        .set('content-type', 'application/json')        
        .send({seat})
        .end((_err, res) => {
          expect(res).to.have.status(201);
          expect(res).to.satisfyApiSpec;
          expect(res.body.seat).to.deep.equal({id: 1, ...seat})
          done();
        })
    })
  })
})