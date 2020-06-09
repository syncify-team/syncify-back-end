exports.up = function (knex) {
  return knex.schema.createTable('episodes', (table) => {
    table.increments('id').unsigned().primary();
    table.string('episode_name').notNull();
    table.integer('podcast_id').unsigned();
    table.foreign('podcast_id').references('podcasts.id');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('episodes');
};
