const jwt = require('../middleware/auth');
const { errorProof, getValidators } = require('../middleware/error');

module.exports = function(app, knex) {
  app.post('/games', jwt, errorProof(async (req, res) => {
    const witnessId = req.user.id;
    const { externalId, startedAt, endedAt, tableId } = req.body.game;
    const id = (await knex.insert({ 
      externalId, 
      startedAt: new Date(startedAt), 
      endedAt: endedAt && new Date(endedAt), 
      tableId, 
      witnessId 
    }).into('game'))[0];  
    res.status(201).json({game: {
      id,
      externalId,
      startedAt,
      endedAt,
      tableId,
      witnessId,
    } });
  }));

  app.patch('/games/:id', jwt, errorProof(async (req, res) => {
    const { endedAt } = req.body.game;
    const { id } = req.params;
    await knex('game').update({ endedAt: new Date(endedAt) }).where({ id });
    res.status(204).send();
  }));
}
