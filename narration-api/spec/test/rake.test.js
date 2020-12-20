const { expect } = require('chai');
const { app, chai, knex } = require('./setup');
const { clearDb, generateGame, getAuthHeader } = require('./util');

describe('rake', () => {
  describe('PUT', () => {
    const rake = { type: 'Pot', amount: 5, max: 10 };

    before(async () => {    
      await clearDb(knex);      
      await generateGame(knex);
    });

    it('should succeed', (done) => {
      chai.request(app)
        .put('/games/1/rake')
        .set('authorization', getAuthHeader(1))
        .set('content-type', 'application/json')        
        .send({rake})
        .end((_err, res) => {
          expect(res).to.have.status(204);
          expect(res).to.satisfyApiSpec;
          done();
        })
    })
  })
})