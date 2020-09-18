
exports.up = function(knex) {
  return knex.schema.alterTable('episodeStatus', (table) => {
    table.dropColumn('duration')
    table.dropColumn('publish_date')
  })
}

exports.down = function(knex) {
  return knex.schema.alterTable('episodeStatus', (table) => {
    table.integer('duration').notNull()
    table.string('publish_date').notNull()
  })
}
