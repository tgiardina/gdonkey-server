const fs = require("fs");

module.exports = (app, models) => {
  return fs.readdirSync(__dirname).forEach((file) => {
    if (
      file.slice(-1) != "~" &&
      file.slice(-7) != "test.js" &&
      file.slice(0, 5) != "index"
    ) {
      require(`./${file}`)(app, models);
    }
  }, {});
};
