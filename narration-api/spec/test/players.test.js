const { expect } = require('chai');
const { app, chai, knex } = require('./setup');
const { clearDb, getAuthHeader } = require('./util');

describe('players', () => {
  describe('POST', () => {
    const user = { username: 'fake-user', hash: 'hash', salt: 'salt'}
    const casino = { name: 'fake-casino'};
    const player = { isMe: true, username: 'fake-player', casinoId: 1, witnessId: 1};    

    before(async () => {    
      await clearDb(knex);      
      await knex('user').insert(user);
      await knex('casino').insert(casino);
    });

    it('should succeed', (done) => {
      chai.request(app)
        .post('/players')
        .set('authorization', getAuthHeader(1))
        .set('content-type', 'application/json')        
        .send({player})
        .end((_err, res) => {
          expect(res).to.have.status(201);
          expect(res).to.satisfyApiSpec;
          expect(res.body.player).to.deep.equal({ id: 1, witnessId: 1, ...player});
          done();
        })
    })
  })  

  describe('GET', () => {
    const user = { username: 'fake-user', hash: 'hash', salt: 'salt'}
    const casino = { name: 'fake-casino'};
    const player = { username: 'fake-player', casinoId: 1, witnessId: 1};              

    before(async () => {
      await clearDb(knex);      
      await knex('user').insert(user);
      await knex('casino').insert(casino);
      await knex('player').insert(player);              
    })    

    describe('is not me', () => {
      it('should succeed', (done) => {
        chai.request(app)
          .get(`/casinos/1/players?username=${player.username}`)
          .set('authorization', getAuthHeader(1))          
          .end((_err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.satisfyApiSpec;
            expect(res.body.players).to.deep.equal([{id:1, isMe: false, witnessId:1, ...player}]);
            done();
          })
      })
    })    

    describe('is me', () => {
      const join = { masterId: 1, playerId: 1};   

      before(async () => {
        await knex('master_player_join').insert(join);          
      })
  
      it('should succeed', (done) => {
        chai.request(app)
          .get(`/casinos/1/players?username=${player.username}`)
          .set('authorization', getAuthHeader(1))          
          .end((_err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.satisfyApiSpec;
            expect(res.body.players).to.deep.equal([{id:1, isMe: true, witnessId:1, ...player}]);
            done();
          })
      })
    })
  })

  describe('PATCH', () => {
    const user = { username: 'fake-user', hash: 'hash', salt: 'salt'}
    const casino = { name: 'fake-casino'};
    const player = { username: 'fake-player', casinoId: 1, witnessId: 1};    

    before(async () => {
      await clearDb(knex);      
      await knex('user').insert(user);
      await knex('casino').insert(casino);
      await knex('player').insert(player);
    })

    it('should succeed', (done) => {
      chai.request(app)
        .patch(`/casinos/1/players/1`)
        .set('authorization', getAuthHeader(1))
        .set('content-type', 'application/json')        
        .send({ player: { isMe: true }})        
        .end((_err, res) => {
          expect(res).to.have.status(204);
          expect(res).to.satisfyApiSpec;
          done();
        })
    })
  })  
})