
exports.up = function(knex) {
  return knex.schema.alterTable('podcasts', (table) => {
    table.dropColumn('podcast_name')
  })
}

exports.down = function(knex) {
  return knex.schema.alterTable('podcasts', (table) => {
    table.string('podcast_name').notNull()
  })
}
