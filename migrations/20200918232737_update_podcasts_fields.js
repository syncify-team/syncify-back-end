
exports.up = function(knex) {
  return knex.schema.alterTable('podcasts', (table) => {
    table.text('image_url')
    table.text('description')
  })
}

exports.down = function(knex) {
  return knex.schema.table('podcasts', (table) => {
    table.dropColumn('image_url')
    table.dropColumn('description')
  })
}
