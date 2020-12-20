exports.seed = async function(knex) {
  const count = (await knex('flop').count('id AS count'))[0].count;
  if(count) return;  
  let promises = [];
  let highId = 2;
  let midId = 1
  let lowId = 0;
  for(let id=0; id<22100; id++) {
    promises.push(knex('flop').insert({
      id,
      highId,
      midId,
      lowId,
    }));
    lowId++;
    if(midId === lowId) {
      midId++;
      lowId = 0;
    }
    if(highId === midId) {
      highId++
      midId = 1;
    }
  }
  await Promise.all(promises);
};
