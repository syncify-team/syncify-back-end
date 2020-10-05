
exports.up = function(knex) {
  return knex.schema.alterTable('episodes', (table) => {
    table.dropColumn('episode_name')
  })
}

exports.down = function(knex) {
  return knex.schema.alterTable('episodes', (table) => {
    table.string('episode_name').notNull()
  })
}
