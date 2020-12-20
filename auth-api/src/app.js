const bodyParser = require("body-parser");
const express = require("express");
const { catchErr } = require("./middleware/error");
const initRoutes = require("./routes");
const initModels = require("./models");

module.exports = (knex) => {
  const app = express();
  app.use(bodyParser.json());
  const models = initModels(knex);
  initRoutes(app, models);
  app.use(catchErr);
  return app;
};
