
exports.up = function(knex) {
  return knex.schema.raw('ALTER TABLE episodes ALTER COLUMN image_url type text;ALTER TABLE episodes ALTER COLUMN ' +
      'description type text;ALTER TABLE episodes ALTER COLUMN file_url type text;')
}

exports.down = function(knex) {
  return knex.schema.raw('ALTER TABLE episodes ALTER COLUMN image_url type VARCHAR(255);ALTER TABLE episodes ALTER ' +
      'COLUMN description type VARCHAR(255);ALTER TABLE episodes ALTER COLUMN file_url type VARCHAR(255);')
}
