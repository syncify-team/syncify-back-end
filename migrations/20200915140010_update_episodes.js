
exports.up = function(knex) {
  return knex.schema.alterTable('episodes', (table) => {
    table.integer('duration').notNull()
      .defaultTo(1)
    table.string('publish_date').notNull()
      .defaultTo('')
    table.string('title').notNull()
      .defaultTo('')
    table.string('image_url').notNull()
      .defaultTo('')
    table.string('description').notNull()
      .defaultTo('')
    table.string('file_url').notNull()
      .defaultTo('')
  })
}

exports.down = function(knex) {
  return knex.schema.table('episodes', (table) => {
    table.dropColumn('duration')
    table.dropColumn('publish_date')
    table.dropColumn('title')
    table.dropColumn('image_url')
    table.dropColumn('description')
    table.dropColumn('file_url')
  })
}
