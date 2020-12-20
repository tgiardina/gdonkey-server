exports.up = function(knex) {
  return knex.schema.createTable('game', function(table) {
    table.increments();
    table.string('externalId').notNullable();
    table.integer('flopId').unsigned();
    table.integer('turnId').unsigned();
    table.integer('riverId').unsigned();    
    table.dateTime('startedAt').notNullable();
    table.dateTime('endedAt');
    table.integer('tableId').unsigned().notNullable();
    table.integer('witnessId').unsigned().notNullable();    
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.foreign('flopId')
      .references('flop.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.foreign('turnId')
      .references('card.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.foreign('riverId')
      .references('card.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.foreign('tableId')
      .references('table.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');                
    table.foreign('witnessId')
      .references('user.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');                
    table.unique(['externalId', 'tableId', 'witnessId']);
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTable('game');  
};
