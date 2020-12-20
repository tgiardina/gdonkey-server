exports.up = async (knex) => {
  await knex.raw("ALTER TABLE `table` ADD COLUMN gameType ENUM('Cash', 'Zone') NOT NULL DEFAULT 'Cash' AFTER id;");
  await knex.schema.alterTable("table", (table) => {
    table.dropForeign("casinoId")
    table.dropUnique(["casinoid", "bigBlind"]);
    table.foreign('casinoId')
      .references('casino.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');                    
    table.unique(["casinoId", "gameType", "bigBlind"]);      
  })
  await knex('table').insert([
    {gameType: "Zone", bigBlind: 5, smallBlind: 2, casinoid: 2},
    {gameType: "Zone", bigBlind: 25, smallBlind: 10, casinoid: 2},    
    {gameType: "Zone", bigBlind: 50, smallBlind: 25, casinoid: 2},        
    {gameType: "Zone", bigBlind: 200, smallBlind: 100, casinoid: 2},        
    {gameType: "Zone", bigBlind: 500, smallBlind: 250, casinoid: 2},        
  ]);                  
};

exports.down = async (knex) => {
  await knex("table").where({ gameType: "Zone"}).del();
  await knex.schema.alterTable("table", (table) => table.dropColumn("gameType"));
};
