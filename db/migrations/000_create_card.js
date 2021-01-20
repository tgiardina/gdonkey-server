const _ = require('lodash');

exports.up = async function(knex) {
  await createTable(knex);
  await seedTable(knex);
};

exports.down = function(knex) {
  return knex.schema.dropTable('card');  
};

async function createTable(knex) {
  await knex.schema.createTable('card', function(table) {
    table.integer(`id`).unsigned().notNullable().primary();
    table.enu('rank', ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']).notNullable();
    table.enu('suit', ['c', 'd', 'h', 's']).notNullable();  
    table.unique(['rank', 'suit']);
  })  
}

async function seedTable(knex) {
  await Promise.all(_.range(0,52).map(id => knex('card').insert({
    id,
    rank: translateRank(Math.floor(id/4)),
    suit: translateSuit(id%4),
  })));
}

function translateRank(id) {
  return id === 0 ? '2'
  : id === 1 ? '3'
  : id === 2 ? '4'
  : id === 3 ? '5'
  : id === 4 ? '6'
  : id === 5 ? '7'
  : id === 6 ? '8'
  : id === 7 ? '9'
  : id === 8 ? 'T'
  : id === 9 ? 'J'
  : id === 10 ? 'Q'
  : id === 11 ? 'K'
  : 'A'
}

function translateSuit(id) {
  return id === 0 ? 'c'
  : id === 1 ? 'd'
  : id === 2 ? 'h'
  : 's'
}