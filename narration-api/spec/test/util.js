const jwt = require('jsonwebtoken');

module.exports = {
  clearDb: async (knex) => {
    let tables = ((await knex.raw('SHOW TABLES'))[0]).map(row => {
      return Object.values(row)[0];
    });
    tables = tables.filter(table => table.substring(0,4) !== 'knex' && table !== "card" && table !== "pocket" && table !== "flop");
    await knex.raw('SET FOREIGN_KEY_CHECKS=0;')
    for(table of tables) await knex(table).truncate();
    await knex.raw('SET FOREIGN_KEY_CHECKS=1;')  
  },

  generateGame: async (knex) => {
    const user = { username: 'fake-user', hash: 'hash', salt: 'salt'}    
    const casino = { name: 'fake-casino'};    
    const table = { bigBlind: 50, smallBlind: 25, casinoId: 1};    
    const game = { externalId: "aa11", startedAt: new Date(), tableId: 1, witnessId: 1};
    await knex('user').insert(user);
    await knex('casino').insert(casino);
    await knex('table').insert(table);
    await knex('game').insert(game);
  },

  generateSeat: async (knex) => {
    const player = { username: 'fake-player', casinoId: 1, witnessId: 1};        
    const seat = { position: 0, stack: 1500, gameId: 1, playerId: 1 };    
    await knex('player').insert(player);
    await knex('seat').insert(seat);    
  },  

  getAuthHeader: id => `Bearer ${jwt.sign({id}, process.env.JWT_SECRET)}`
}