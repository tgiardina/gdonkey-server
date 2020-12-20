module.exports = async (knex) => {
  await knex.destroy();
};
