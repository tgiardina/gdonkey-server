exports.up = async function(knex) {
  await createTable(knex);
  await seedTable(knex);
};

exports.down = function(knex) {
  return knex.schema.dropTable('casino');  
};

async function createTable(knex) {
  await knex.schema.createTable('casino', function(table) {
    table.increments();
    table.string('name').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.unique('name');
  })  
}

async function seedTable(knex) {
  await knex('casino').insert([
    {id: 1, name: 'gpokr'},
    {id: 2, name: 'bovada'},
  ]);  
}