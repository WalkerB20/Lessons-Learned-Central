/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('AAR_Comment', function(table) {
    table.increments('AAR_Comment_ID').primary();
    table.integer('AAR_Category_ID').unsigned();
    table.foreign('AAR_Category_ID').references('AAR_Category.AAR_Category_ID');
    table.integer('Comment_ID').unsigned();
    table.foreign('Comment_ID').references('Comment.Comment_ID');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('AAR_Comment', function(table) {
    table.dropForeign('AAR_Category_ID');
    table.dropForeign('Comment_ID');
  })
  .then (function() {
    return knex.schema.dropTableIfExists('AAR_Comment');
  });
};
