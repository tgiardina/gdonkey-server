exports.up = function(knex) {
  return knex.schema.createTable('casino', function(table) {
    table.increments();
    table.string('name').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.unique('name');
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTable('casino');  
};
