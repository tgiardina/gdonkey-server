const jwt = require('../middleware/auth');
const { errorProof, getValidators } = require('../middleware/error');

module.exports = function(app, knex) {
  app.put('/games/:gameId/rake', jwt, errorProof(async (req, res) => {
    const { type, amount, max } = req.body.rake;
    const { gameId } = req.params;
    // TODO
    res.status(204).send();
  }));
}
