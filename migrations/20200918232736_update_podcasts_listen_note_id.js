
exports.up = function(knex) {
  return knex.schema.alterTable('podcasts', (table) => {
    table.string('listen_note_id')
  })
}

exports.down = function(knex) {
  return knex.schema.table('podcasts', (table) => {
    table.dropColumn('listen_note_id')
  })
}
