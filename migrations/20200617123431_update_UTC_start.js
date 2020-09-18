
exports.up = function(knex) {
  return knex.schema.alterTable('episodeStatus', (table) => {
    table.string('utc_time_start').alter()
  })
}

exports.down = function(knex) {
  return knex.schema.table('episodeStatus', (table) => {
    table.dropColumn('utc_time_start')
  })
}
