/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.createTable('Category', function(table) {
    table.increments('Category_ID').primary();
    table.integer('Range_ID').unsigned();
    table.foreign('Range_ID').references('Range.Range_ID');
    table.integer('Deployment_ID').unsigned();
    table.foreign('Deployment_ID').references('Deployment.Deployment_ID');
    table.integer('FTX_ID').unsigned();
    table.foreign('FTX_ID').references('FTX.FTX_ID');
    table.integer('Equipment_ID').unsigned();
    table.foreign('Equipment_ID').references('Equipment.Equipment_ID');
    table.integer('Airborne_Operation_ID').unsigned();
    table.foreign('Airborne_Operation_ID').references('Airborne_Operation.Airborne_Operation_ID');
    table.integer('Other_ID').unsigned();
    table.foreign('Other_ID').references('Other.Other_ID');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.alterTable('Category', function(table) {
    table.dropForeign('Range_ID');
    table.dropForeign('Deployment_ID');
    table.dropForeign('FTX_ID');
    table.dropForeign('Equipment_ID');
    table.dropForeign('Airborne_Operation_ID');
    table.dropForeign('Other_ID');
  })
  .then (function() {
    return knex.schema.dropTableIfExists('Category');
  });
};
