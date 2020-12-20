module.exports = {
  clearDb: async (knex) => {
    let tables = (await knex.raw("SHOW TABLES"))[0].map((row) => {
      return Object.values(row)[0];
    });
    tables = tables.filter((table) => table.substring(0, 4) !== "knex");
    await knex.raw("SET FOREIGN_KEY_CHECKS=0;");
    for (let table of tables) await knex(table).truncate();
    await knex.raw("SET FOREIGN_KEY_CHECKS=1;");
  },
};
