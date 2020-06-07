import dotenv from 'dotenv';
import knex from 'knex';
import mockKnex from 'mock-knex';

dotenv.config();
let knexConnection;

if (process.env.NODE_ENV === 'test') {
  knexConnection = knex({
    client: 'pg',
    debug: false,
  });
  mockKnex.mock(knexConnection);
} else {
  knexConnection = knex({
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      charset: 'utf8',
    },
  });
}

const bookshelf = require('bookshelf')(knexConnection);

export default bookshelf;
