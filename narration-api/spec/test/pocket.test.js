const { expect } = require('chai');
const { app, chai, knex } = require('./setup');
const { clearDb, generateGame, generateSeat, getAuthHeader } = require('./util');

describe('pocket', () => {
  describe('PUT', () => {
    const pocket = { cards: [{rank: 0, suit:0}, {rank:0, suit:1}]};

    before(async () => {    
      await clearDb(knex);      
      await generateGame(knex);
      await generateSeat(knex);      
    });

    it('should succeed', (done) => {
      chai.request(app)
        .put('/seats/1/pocket')
        .set('authorization', getAuthHeader(1))
        .set('content-type', 'application/json')        
        .send({pocket})
        .end((_err, res) => {
          expect(res).to.have.status(204);
          expect(res).to.satisfyApiSpec;
          done();
        })
    })
  })
})