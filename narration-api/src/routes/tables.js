const { errorProof, getValidators } = require('../middleware/error');

module.exports = function(app, knex) {
  app.get('/casinos/:casinoId/tables', errorProof(async (req, res) => {
    const tables = await knex.select('id', 'gameType', 'bigBlind', 'smallBlind', 'casinoId').from('table').where({ casinoId: req.params.casinoId})
    res.status(200).json({tables});
  }));
}
