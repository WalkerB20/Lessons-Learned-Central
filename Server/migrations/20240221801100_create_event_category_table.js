/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('Event_Category', function(table) {
    table.increments('Event_Category_ID').primary();
    table.integer('Event_ID').unsigned();
    table.foreign('Event_ID').references('AAR.Event_ID');
    table.integer('Category_ID').unsigned();
    table.foreign('Category_ID').references('Category.Category_ID');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('Event_Category', function(table) {
    table.dropForeign('Category_ID');
    table.dropForeign('Event_ID');
  })
  .then (function() {
    return knex.schema.dropTableIfExists('Event_Category');
  });
};