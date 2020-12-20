exports.up = function(knex) {
  return knex.schema.createTable('card', function(table) {
    table.integer(`id`).unsigned().notNullable().primary();
    table.enu('rank', ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']).notNullable();
    table.enu('suit', ['c', 'd', 'h', 's']).notNullable();  
    table.unique(['rank', 'suit']);
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTable('card');  
};
