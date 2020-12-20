const { expect } = require('chai');
const { app, chai, knex } = require('./setup');
const { clearDb, generateGame, getAuthHeader } = require('./util');

describe('turn', () => {
  describe('PUT', () => {
    const turn = { cards: [{rank: 0, suit:0}] }

    before(async () => {    
      await clearDb(knex);      
      await generateGame(knex);
    });

    it('should succeed', (done) => {
      chai.request(app)
        .put('/games/1/turn')
        .set('authorization', getAuthHeader(1))
        .set('content-type', 'application/json')        
        .send({turn})
        .end((_err, res) => {
          expect(res).to.have.status(204);
          expect(res).to.satisfyApiSpec;
          done();
        })
    })
  })
})