exports.up = function(knex) {
  return knex.schema.createTable('pocket', function(table) {
    table.integer(`id`).unsigned().notNullable().primary();
    table.integer('highId').unsigned().notNullable();
    table.integer('lowId').unsigned().notNullable();
    table.foreign('highId')
      .references('card.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.foreign('lowId')
      .references('card.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');                        
    table.unique(['highId', 'lowId']);
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTable('pocket');  
};
