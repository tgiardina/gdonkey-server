exports.up = function(knex) {
  return knex.schema.createTable('user', function(table) {
    table.increments();
    table.string('username').notNullable();
    table.string('hash').notNullable();
    table.string('salt').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.unique('username');
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTable('user');  
};
