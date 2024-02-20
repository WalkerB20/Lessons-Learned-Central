/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('Deployment', function(table) {
    table.increments('Deployment_ID').primary();
    table.string('Pre_deployment');
    table.string('Packing_list');
    table.string('Equipment');
    table.string('Post_deployment');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('Deployment');
};