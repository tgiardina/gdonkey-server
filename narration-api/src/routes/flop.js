const { getCard, getFlop } = require('../lib/card');
const jwt = require('../middleware/auth');
const { errorProof, getValidators } = require('../middleware/error');

module.exports = function(app, knex) {
  app.put('/games/:gameId/flop', [
    jwt,
  ], errorProof(async (req, res) => {
    const { cards } = req.body.flop;
    const { gameId } = req.params;
    const card0Id = getCard(cards[0].rank, cards[0].suit);
    const card1Id = getCard(cards[1].rank, cards[1].suit);    
    const card2Id = getCard(cards[2].rank, cards[2].suit);    
    const flopId = getFlop(card0Id, card1Id, card2Id);
    await knex('game').update({ flopId }).where({ id: gameId });
    res.status(204).send();
  }));
}