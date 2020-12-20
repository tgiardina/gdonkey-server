require('dotenv').config({path: '../../.env.test'});
const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiResponseValidator = require('chai-openapi-response-validator');
const knex = require('knex')({
  client: 'mysql2',
  connection: {
    database : process.env.MYSQL_DATABASE,    
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
  }
});
const path = require('path');
const app = require('../../src/app');

chai.use(chaiHttp)
chai.use(chaiResponseValidator(path.resolve(__dirname, '../openapi.yml')));

module.exports = {
  app,
  chai,
  knex,
}
