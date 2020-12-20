const { body, param } = require('express-validator');
const { getCard, getPocket } = require('../lib/card');
const jwt = require('../middleware/auth');
const { errorProof, getValidators } = require('../middleware/error');

module.exports = function(app, knex) {
  app.put('/seats/:seatId/pocket', [
    jwt,
    ...getValidators([
      param('seatId').isInt({gt: 0}),
      body('pocket').exists(),
      body('pocket.cards').isArray().isLength(2),
      body('pocket.cards[0]').exists(),    
      body('pocket.cards[0].rank').isInt({gt: -1, lt: 13}),
      body('pocket.cards[0].suit').isInt({gt: -1, lt: 4}),   
      body('pocket.cards[1]').exists(),    
      body('pocket.cards[1].rank').isInt({gt: -1, lt: 13}),
      body('pocket.cards[1].suit').isInt({gt: -1, lt: 4}),       
    ]),
  ], errorProof(async (req, res) => {
    const { cards } = req.body.pocket;
    const { seatId } = req.params;
    const card0Id = getCard(cards[0].rank, cards[0].suit);
    const card1Id = getCard(cards[1].rank, cards[1].suit);    
    const pocketId = getPocket(card0Id, card1Id);
    await knex('seat').update({ pocketId }).where({ id: seatId });
    res.status(204).send();
  }));
}