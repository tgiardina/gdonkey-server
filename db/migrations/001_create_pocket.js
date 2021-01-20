exports.up = async function(knex) {
  await createTable(knex);
  await seedTable(knex);
};

exports.down = function(knex) {
  return knex.schema.dropTable('pocket');  
};

async function createTable(knex) {
  await knex.schema.createTable('pocket', function(table) {
    table.integer(`id`).unsigned().notNullable().primary();
    table.integer('highId').unsigned().notNullable();
    table.integer('lowId').unsigned().notNullable();
    table.foreign('highId')
      .references('card.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.foreign('lowId')
      .references('card.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');                        
    table.unique(['highId', 'lowId']);
  })  
}

async function seedTable(knex) { 
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
}