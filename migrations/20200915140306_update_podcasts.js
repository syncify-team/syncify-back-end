
exports.up = function(knex) {
  return knex.schema.alterTable('podcasts', (table) => {
    table.string('title').notNull()
    table.string('author').notNull()
  })
}

exports.down = function(knex) {
  return knex.schema.table('podcasts', (table) => {
    table.dropColumn('title')
    table.dropColumn('author')
  })
}
