/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('AAR_Category', function(table) {
    table.increments('AAR_Category_ID').primary();
    table.integer('Category_ID').unsigned();
    table.foreign('Category_ID').references('Category.Category_ID');
    table.integer('AAR_ID').unsigned();
    table.foreign('AAR_ID').references('AAR.AAR_ID');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('AAR_Category', function(table) {
    table.dropForeign('Category_ID');
    table.dropForeign('AAR_ID');
  })
  .then (function() {
    return knex.schema.dropTableIfExists('AAR_Category');
  });
};
