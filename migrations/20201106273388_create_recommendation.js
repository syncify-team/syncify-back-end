
exports.up = function(knex) {
  return knex.schema.createTable('recommendations', (table) => {
    table.increments('id').unsigned()
      .primary()
    table.integer('source_user_id').notNull()
    table.integer('target_user_id').notNull()
    table.integer('episode_id').notNull()
    table.string('testimony').notNull()
    table.foreign('source_user_id').references('users.id')
    table.foreign('target_user_id').references('users.id')
    table.foreign('episode_id').references('episodes.id')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('recommendations')
}
