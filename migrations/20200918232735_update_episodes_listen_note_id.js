
exports.up = function(knex) {
  return knex.schema.alterTable('episodes', (table) => {
    table.string('listen_note_id')
  })
}

exports.down = function(knex) {
  return knex.schema.table('episodes', (table) => {
    table.dropColumn('listen_note_id')
  })
}
