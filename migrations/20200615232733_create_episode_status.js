
exports.up = function(knex) {
    return knex.schema.createTable('episodeStatus', (table) => {
        table.increments('id').unsigned().primary()
        table.integer('user_id').notNull()
        table.boolean('is_playing').notNull()
        table.boolean('completed').notNull()
        table.integer('timestamp_in_episode').notNull()
        table.integer('duration').notNull()
        table.integer('utc_time_start').notNull()
        table.string('publish_date').notNull()
        table.string('episode_title').notNull()
        table.string('episode_image_url').notNull()
        table.string('episode_description').notNull()
        table.string('episode_file_url').notNull()
        table.string('podcast_title').notNull()
        table.string('podcast_author').notNull()
        table.foreign('user_id').references('users.id')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('episodeStatus')
};
