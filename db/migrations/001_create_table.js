exports.up = async function(knex) {
  await createTable(knex);
  await seedTable(knex);
};

exports.down = function(knex) {
  return knex.schema.dropTable('table');  
};

async function createTable(knex) {
  await knex.schema.createTable('table', function(table) {
    table.increments();
    table.integer('bigBlind').notNullable();
    table.integer('smallBlind').notNullable();
    table.integer('casinoId').unsigned().notNullable();    
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.foreign('casinoId')
      .references('casino.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');                
    table.unique(['casinoId', 'bigBlind']);
  })  
}

async function seedTable(knex) {
  const count = (await knex('table').count('id AS count'))[0].count;
  if(count) return;  
  await knex('table').insert([
    {id: 1, bigBlind: 50, smallBlind: 25, casinoid: 1},
    {id: 2, bigBlind: 200, smallBlind: 100, casinoid: 1},
    {id: 3, bigBlind: 1000, smallBlind: 500, casinoid: 1},
    {id: 4, bigBlind: 2000, smallBlind: 1000, casinoid: 1},
    {id: 5, bigBlind: 5000, smallBlind: 2500, casinoid: 1},
    {id: 6, bigBlind: 20000, smallBlind: 10000, casinoid: 1},
    {id: 7, bigBlind: 5, smallBlind: 2, casinoid: 2},
    {id: 8, bigBlind: 10, smallBlind: 5, casinoid: 2},
    {id: 9, bigBlind: 25, smallBlind: 10, casinoid: 2},
    {id: 10, bigBlind: 50, smallBlind: 25, casinoid: 2},
    {id: 11, bigBlind: 100, smallBlind: 50, casinoid: 2},
    {id: 12, bigBlind: 200, smallBlind: 100, casinoid: 2},
    {id: 13, bigBlind: 500, smallBlind: 250, casinoid: 2},                
  ]);  
}