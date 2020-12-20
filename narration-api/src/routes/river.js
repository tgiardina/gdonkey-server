const { getCard, getFlop } = require('../lib/card');
const jwt = require('../middleware/auth');
const { errorProof, getValidators } = require('../middleware/error');

module.exports = function(app, knex) {
  app.put('/games/:gameId/river', [
    jwt,
  ], errorProof(async (req, res) => {
    const { cards } = req.body.river;
    const { gameId } = req.params;
    const riverId = getCard(cards[0].rank, cards[0].suit);
    await knex('game').update({ riverId }).where({ id: gameId });
    res.status(204).send();
  }));
}