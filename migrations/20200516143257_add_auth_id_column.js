
exports.up = function (knex) {
  return knex.schema.table('users', (table) => {
    table.string('auth0_id').index()
      .unique()
      .notNull()
  })
}

exports.down = function (knex) {
  return knex.schema.table('users', (table) => {
    table.dropColumn('auth0_id')
  })
}
