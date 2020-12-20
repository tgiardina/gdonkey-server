require("dotenv").config({ path: "../../.env.test" });
const jestOpenAPI = require("jest-openapi");
const path = require("path");
const supertest = require("supertest");
const { clearDb } = require("./utils");
const knex = require("knex")({
  client: "mysql2",
  connection: {
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
});
const unwrappedApp = require("../../src/app")(knex);

module.exports = async () => {
  await clearDb(knex);
  jestOpenAPI(path.resolve(__dirname, "../openapi.yml"));
  const app = supertest(unwrappedApp);

  return {
    app,
    knex,
  };
};
