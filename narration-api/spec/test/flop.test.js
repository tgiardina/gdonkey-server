const { expect } = require('chai');
const { app, chai, knex } = require('./setup');
const { clearDb, generateGame, getAuthHeader } = require('./util');

describe('flop', () => {
  describe('PUT', () => {
    const flop = { cards: [{rank: 0, suit:0}, {rank:0, suit:1}, {rank:0, suit:2}] }

    before(async () => {    
      await clearDb(knex);      
      await generateGame(knex);
    });

    it('should succeed', (done) => {
      chai.request(app)
        .put('/games/1/flop')
        .set('authorization', getAuthHeader(1))
        .set('content-type', 'application/json')        
        .send({flop})
        .end((_err, res) => {
          expect(res).to.have.status(204);
          expect(res).to.satisfyApiSpec;
          done();
        })
    })
  })
})