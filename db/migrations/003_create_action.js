exports.up = function(knex) {
  return knex.schema.createTable('action', function(table) {
    table.increments();
    table.integer('amount')
    table.integer('delay');
    table.enu('street', ['Preflop', 'Flop', 'Turn', 'River']);
    table.integer('tally');
    table.enu('type', ['Donate', 'PostBlind', 'Fold', 'CheckCall', 'BetRaise']);
    table.integer('seatId').unsigned().notNullable();        
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.foreign('seatId')
      .references('seat.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');            
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTable('action');  
};
