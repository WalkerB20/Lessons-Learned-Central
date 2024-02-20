/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('Comment', function(table) {
    table.increments('Comment_ID').primary();
    table.string('Comment_Type');
    table.string('Comment_Title');
    table.text('Comment_Discussion');
    table.text('Comment_Recommendation');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('Comment');
};