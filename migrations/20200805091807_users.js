
exports.up = function(knex) {
    return knex.schema.table('users', (table) => {
        table.string('firebase_id').index().unique().notNull()
        table.dropColumn('auth0_id')
    })
};

exports.down = function(knex) {
    return knex.schema.table("episodeStatus", (table) => {
        table.dropColumn("firebase_id")
        table.string('auth0_id').alter().index().unique()
    })
};
