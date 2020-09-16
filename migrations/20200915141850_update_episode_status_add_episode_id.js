
exports.up = function(knex) {
    return knex.schema.alterTable("episodeStatus", (table) => {
        table.integer('episode_id')
        table.foreign('episode_id').references('episodes.id')
    })
};

exports.down = function(knex) {
    return knex.schema.alterTable("episodeStatus", (table) => {
        table.dropColumn('episode_id');
    })
};
