const envFile = process.env.NODE_ENV === 'test'
  ? '../.env.test'
  : '../.env';
require('dotenv').config({path: envFile});

module.exports = {
  test: {
    client: 'mysql2',
    connection: {
      database: process.env.MYSQL_DATABASE,      
      host:     process.env.MYSQL_HOST,      
      user:     process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },  
  development: {
    client: 'mysql2',
    connection: {
      database: process.env.MYSQL_DATABASE,            
      host:     process.env.MYSQL_HOST,      
      user:     process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
