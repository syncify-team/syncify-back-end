
exports.up = function(knex) {
  return knex.schema.createTable('episodeGroupItems', (table) => {
    table.increments('id').unsigned()
      .primary()
    table.integer('group_id').notNull()
    table.integer('episode_id').notNull()
    table.foreign('group_id').references('episodeGroups.id')
    table.foreign('episode_id').references('episodes.id')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('episodeGroupItems')
}
