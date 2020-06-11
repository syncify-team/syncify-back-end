exports.up = function (knex) {
  return knex.schema.alterTable("friendships", (table) => {
    table.dropForeign("user1_id")
    table.dropForeign("user2_id")

    table.foreign("user1_id").references("users.id").onDelete("CASCADE")
    table.foreign("user2_id").references("users.id").onDelete("CASCADE")
  })

}

exports.down = function (knex) {
  return knex.schema.alterTable("friendships", (table) => {
    table.dropForeign("user1_id")
    table.dropForeign("user2_id")

    table.foreign("user1_id").references("users.id").onDelete("NO ACTION")
    table.foreign("user2_id").references("users.id").onDelete("NO ACTION")
  })
}
