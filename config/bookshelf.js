import dotenv from 'dotenv'
dotenv.config();

var knex = require('knex')({
	client: 'pg',
	connection: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		charset: 'utf8'
	}
});
var bookshelf = require('bookshelf')(knex);

export default bookshelf;
