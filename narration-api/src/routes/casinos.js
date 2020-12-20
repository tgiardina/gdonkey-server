const { errorProof } = require('../middleware/error');

module.exports = function(app, knex) {
  app.get('/casinos', errorProof(async (_req, res) => {
    const casinos = await knex.select('id', 'name').from('casino');
    res.status(200).json({casinos});
  }));
}
