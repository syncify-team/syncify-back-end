
exports.up = function(knex) {
  return knex.schema.alterTable('episodeStatus', (table) => {
    table.text('episode_description').alter()
    table.text('episode_image_url').alter()
    table.text('episode_file_url').alter()
  })
}

exports.down = function(knex) {
  return knex.schema.table('episodeStatus', (table) => {
    table.dropColumn('episode_description')
    table.dropColumn('episode_image_url')
    table.dropColumn('episode_file_url')
  })
}
