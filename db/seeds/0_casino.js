exports.seed = async function(knex) {
  const count = (await knex('casino').count('id AS count'))[0].count;
  if(count) return;
  await knex('casino').insert([
    {id: 1, name: 'gpokr'},
    {id: 2, name: 'bovada'},
  ]);
};
