
exports.up = function(knex) {
  return knex.schema.alterTable('episodeStatus', (table) => {
    table.dropColumn('episode_title')
    table.dropColumn('episode_image_url')
    table.dropColumn('episode_description')
    table.dropColumn('episode_file_url')
    table.dropColumn('podcast_title')
    table.dropColumn('podcast_author')
  })
}

exports.down = function(knex) {
  return knex.schema.alterTable('episodeStatus', (table) => {
    table.string('episode_title').notNull()
    table.string('episode_image_url').notNull()
    table.string('episode_description').notNull()
    table.string('episode_file_url').notNull()
    table.string('podcast_title').notNull()
    table.string('podcast_author').notNull()
  })
}
