const jwt = require('../middleware/auth');
const { errorProof, getValidators } = require('../middleware/error');

module.exports = function(app, knex) {
  app.post('/actions', [
    jwt,
  ], errorProof(async (req, res) => {
    const { tally, type, amount, delay, street, seatId } = req.body.action;
    const id = (await knex('action').insert({ tally, type, amount, delay, street, seatId }))[0];
    res.status(201).json({
      action : {
        id, tally, type, amount, delay, street, seatId        
      }
    });
  }));
}