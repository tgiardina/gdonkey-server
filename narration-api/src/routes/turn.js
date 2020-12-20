const { getCard, getFlop } = require('../lib/card');
const jwt = require('../middleware/auth');
const { errorProof, getValidators } = require('../middleware/error');

module.exports = function(app, knex) {
  app.put('/games/:gameId/turn', [
    jwt,
  ], errorProof(async (req, res) => {
    const { cards } = req.body.turn;
    const { gameId } = req.params;
    const turnId = getCard(cards[0].rank, cards[0].suit);
    await knex('game').update({ turnId }).where({ id: gameId });
    res.status(204).send();
  }));
}