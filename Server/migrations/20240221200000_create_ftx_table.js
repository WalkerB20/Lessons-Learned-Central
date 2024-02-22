/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .then(() => {
      return knex.schema.createTable('FTX', function(table) {
        table.uuid('FTX_ID').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('Training_Site');
        table.string('Logistics');
        table.string('Training_Modules')
        table.string('Lead_up_Training')
        table.string('Packing_list');
        table.string('Event_Type');
      })
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function(knex) {
  return knex.schema.dropTableIfExists('FTX')
    .then(() => knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"'));
};