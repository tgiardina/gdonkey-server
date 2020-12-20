const bodyParser = require('body-parser');
const express = require('express');
const { catchErr } = require('./middleware/error');
const initRoutes = require('./routes');
const knex = require('knex')({
  client: 'mysql2',
  connection: {
    database : process.env.MYSQL_DATABASE,        
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,    
  }
});

const app = express();
app.use(bodyParser.json());
initRoutes(app, knex);
app.use(catchErr);

module.exports = app;
