exports.up = function(knex) {
  return knex.schema.createTable('seat', function(table) {
    table.increments();
    table.integer('position').unsigned().notNullable();
    table.integer('stack').unsigned().notNullable();    
    table.integer('gameId').unsigned().notNullable();
    table.integer('playerId').unsigned().notNullable();
    table.integer('pocketId').unsigned();    
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.foreign('gameId')
      .references('game.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');                
    table.foreign('playerId')
      .references('player.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.foreign('pocketId')
      .references('pocket.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');                    
    table.unique(['position', 'gameId']);
    table.unique(['gameId', 'playerId']);    
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTable('seat');  
};
