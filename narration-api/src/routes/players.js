const jwt = require('../middleware/auth');
const { errorProof, getValidators } = require('../middleware/error');

module.exports = function(app, knex) {
  app.post('/players', jwt, errorProof(async (req, res) => {
    const masterId = req.user.id;
    const witnessId = req.user.id;
    const { isMe, username, casinoId } = req.body.player;
    const id = (await knex('player').insert({ username, casinoId, witnessId }))[0];
    if(isMe) await knex('master_player_join').insert({ masterId, playerId: id });
    res.status(201).json({player: {
      id,
      isMe: isMe || false,
      username,
      casinoId,
      witnessId,
    } });
  }));

  app.get('/casinos/:casinoId/players', jwt, errorProof(async (req, res) => {
    const masterId = req.user.id;    
    const casinoId = req.params.casinoId;
    const username = req.query.username;
    const players = await knex('player').select('id', 'username', 'casinoId', 'witnessId' ).where({ casinoId, username})
    const player = players[0];
    if(player) {
      const isMe = (await knex('master_player_join').count('*').where({masterId, playerId: player.id }))[0]["count(*)"]; 
      player.isMe = !!isMe
    }
    res.status(200).json({players: player ? [player] : []});
  }));

  app.patch('/casinos/:casinoId/players/:id', jwt, errorProof(async (req, res) => {
    const masterId = req.user.id;    
    const playerId = req.params.id;
    const isMe = req.body.player.isMe;
    if(isMe) {
      const isLinked = (await knex('master_player_join').count('*').where({masterId, playerId }))[0]["count(*)"]; 
      if(!isLinked) await knex('master_player_join').insert({ masterId, playerId });    
    }
    res.status(204).send();
  }));  
}