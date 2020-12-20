require("dotenv").config({ path: "../.env" });
const knex = require("knex")({
  client: "mysql2",
  connection: {
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
});
const app = require("./app")(knex);

const port = process.env.AUTH_PORT || 3000;

app.listen(port, () =>
  console.log(`Auth API listening at http://localhost:${port}`)
);
