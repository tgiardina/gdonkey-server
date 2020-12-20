const _ = require('lodash');

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

exports.seed = async function(knex) {
  const count = (await knex('card').count('id AS count'))[0].count;
  if(count) return;
  await Promise.all(_.range(0,52).map(id => knex('card').insert({
    id,
    rank: translateRank(Math.floor(id/4)),
    suit: translateSuit(id%4),
  })));
};
