exports.up = function (knex) {
  return knex.schema.createTable('friendships', (table) => {
    table.increments('id').unsigned().primary()
    table.integer('user1_id').unsigned()
    table.integer('user2_id').unsigned()
    table.foreign('user1_id').references('users.id')
    table.foreign('user2_id').references('users.id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('friendships')
}
