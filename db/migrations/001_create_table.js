exports.up = function(knex) {
  return knex.schema.createTable('table', function(table) {
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
};

exports.down = function(knex) {
  return knex.schema.dropTable('table');  
};
