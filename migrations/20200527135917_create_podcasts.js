exports.up = function (knex) {
  return knex.schema.createTable('podcasts', (table) => {
    table.increments('id').unsigned().primary()
    table.string('podcast_name').notNull()
    table.string('rss_feed').notNull()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('podcasts')
}
