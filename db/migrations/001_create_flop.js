exports.up = async function(knex) {
  await createTable(knex);
  await seedTable(knex);
}

exports.down = function(knex) {
  return knex.schema.dropTable('flop');  
};

async function createTable(knex) {
  await knex.schema.createTable('flop', function(table) {
    table.integer('id').unsigned().notNullable().primary();
    table.integer('highId').unsigned().notNullable();
    table.integer('midId').unsigned().notNullable();
    table.integer('lowId').unsigned().notNullable();                
    table.foreign('highId')
      .references('card.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.foreign('midId')
      .references('card.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.foreign('lowId')
      .references('card.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.unique(['highId', 'midId', 'lowId']);    
  })    
}

async function seedTable(knex) {
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
}
