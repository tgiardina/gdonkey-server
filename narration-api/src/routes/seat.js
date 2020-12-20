const jwt = require('../middleware/auth');
const { errorProof, getValidators } = require('../middleware/error');

module.exports = function(app, knex) {
  app.post('/seats', jwt, errorProof(async (req, res) => {
    const { position, stack, gameId, playerId } = req.body.seat;
    const id = (await knex('seat').insert({ position, stack, gameId, playerId }))[0];
    res.status(201).json({seat: {
      id,
      position,
      stack,
      gameId,
      playerId,
    } });
  }));
}
