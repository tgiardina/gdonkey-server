exports.seed = async function(knex) {
  const count = (await knex('pocket').count('id AS count'))[0].count;
  if(count) return;    
  let promises = [];
  let highId = 1;
  let lowId = 0;
  for(let id=0; id<1326; id++) {
    promises.push(knex('pocket').insert({
      id,
      highId,
      lowId,
    }));
    lowId++;
    if(highId === lowId) {
      highId++;
      lowId = 0;
    }
  }
  await Promise.all(promises);
};
