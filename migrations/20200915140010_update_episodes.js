
exports.up = function(knex) {
    return knex.schema.alterTable("episodes", (table) => {
        table.integer('duration').notNull()
        table.string('publish_date').notNull()
        table.string('title').notNull()
        table.string('image_url').notNull()
        table.string('description').notNull()
        table.string('file_url').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.table("episodes", (table) => {
        table.dropColumn("duration")
        table.dropColumn("publish_date")
        table.dropColumn("title")
        table.dropColumn("image_url")
        table.dropColumn("description")
        table.dropColumn("file_url")
    })
};
