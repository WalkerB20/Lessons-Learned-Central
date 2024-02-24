/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .then(() => {
      return knex.schema.createTable('Category', function(table) {
        table.uuid('Category_ID').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('Range_ID');
        table.foreign('Range_ID').references('Range.Range_ID');
        table.uuid('Deployment_ID');
        table.foreign('Deployment_ID').references('Deployment.Deployment_ID');
        table.uuid('FTX_ID');
        table.foreign('FTX_ID').references('FTX.FTX_ID');
        table.uuid('Equipment_ID');
        table.foreign('Equipment_ID').references('Equipment.Equipment_ID');
        table.uuid('Airborne_ID');
        table.foreign('Airborne_ID').references('Airborne.Airborne_ID');
        table.uuid('Other_ID');
        table.foreign('Other_ID').references('Other.Other_ID');
      })
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function(knex) {
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
  })
  .then(() => knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"'));
};