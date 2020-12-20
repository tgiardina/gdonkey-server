const { expect } = require('chai');
const { app, chai, knex } = require('./setup');
const { clearDb, generateGame, generateSeat, getAuthHeader } = require('./util');

describe('actions', () => {
  describe('POST', () => {
    const action = { tally: 0, type: "CheckCall", amount: 0, delay: 1000, street: "Preflop", seatId: 1};

    before(async () => {    
      await clearDb(knex);      
      await generateGame(knex);
      await generateSeat(knex);      
    });

    it('should succeed', (done) => {
      chai.request(app)
        .post('/actions')
        .set('authorization', getAuthHeader(1))
        .set('content-type', 'application/json')        
        .send({action})
        .end((_err, res) => {
          expect(res).to.have.status(201);
          expect(res).to.satisfyApiSpec;
          expect(res.body.action).to.deep.equal({id: 1, ...action})          
          done();
        })
    })
  })
})