/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('FTX', function(table) {
    table.increments('FTX_ID').primary();
    table.string('Modules');
    table.string('Prep_training');
    table.string('Packing_list');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('FTX');
};
