exports.up = function(knex) {
  return knex.schema.createTable('player', function(table) {
    table.increments();
    table.string('username').notNullable();
    table.integer('casinoId').unsigned().notNullable();
    table.integer('witnessId').unsigned().notNullable();        
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.foreign('casinoId')
      .references('casino.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');            
    table.foreign('witnessId')
      .references('user.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');                
    table.unique(['username', 'casinoId']);
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTable('player');  
};
