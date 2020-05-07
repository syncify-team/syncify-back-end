exports.up = function (knex) {
	return knex.schema.createTable('users', (table) => {
		table.increments('id').unsigned().primary();
		table.string('username').notNull();
		table.string('email').notNull();
		table.string('first_name').notNull();
		table.string('last_name').notNull();
		table.string('social_login_type').notNull();

	})
};

exports.down = function (knex) {
	return knex.schema.dropTable('users');
};