const fs = require("fs");

module.exports = (knex) => {
  return fs.readdirSync(__dirname).reduce((models, file) => {
    if (
      file.slice(-1) != "~" &&
      file.slice(-7) != "test.js" &&
      file.slice(0, 5) != "index"
    ) {
      models[file.split(".")[0]] = require(`./${file}`)(knex);
    }
    return models;
  }, {});
};
