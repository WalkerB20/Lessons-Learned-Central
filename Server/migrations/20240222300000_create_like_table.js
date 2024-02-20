/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('Like', function(table) {
    table.increments('Like_ID').primary();
    table.integer('User_ID').unsigned();
    table.foreign('User_ID').references('User.User_ID');
    table.integer('Comment_ID').unsigned();
    table.foreign('Comment_ID').references('Comment.Comment_ID');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('Like', function(table) {
    table.dropForeign('User_ID');
    table.dropForeign('Comment_ID');
  })
  .then (function() {
    return knex.schema.dropTableIfExists('Like');
  });
};
