exports.up = async function(knex) {
  await knex.schema.createTable('master_player_join', function(table) {
    table.integer('masterId').unsigned().notNullable();            
    table.integer('playerId').unsigned().notNullable();                
    table.foreign('masterId')
      .references('user.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');      
    table.foreign('playerId')
      .references('player.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');      
    table.unique(['masterId', 'playerId']);
  })  
};

exports.down = async function(knex) {
  await knex.schema.dropTable('master_player_join');
};
