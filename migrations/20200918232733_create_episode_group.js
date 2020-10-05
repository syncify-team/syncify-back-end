
exports.up = function(knex) {
  return knex.schema.createTable('episodeGroups', (table) => {
    table.increments('id').unsigned()
      .primary()
    table.integer('user_id').notNull()
    table.string('name').notNull()
    table.foreign('user_id').references('users.id')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('episodeGroups')
}
