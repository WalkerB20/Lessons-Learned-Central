/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
      .then(() => {
          return knex.schema.createTable('Range', function(table) {
              table.uuid('Range_ID').defaultTo(knex.raw('uuid_generate_v4()')).primary();
              table.string('Range_Event_Type', 255);
              table.string('Range_Event_Option', 255);
              table.string('Range_Event_Other', 255);
          });
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function(knex) {
  return knex.schema.dropTable('Range')
      .then(() => knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"'));
};
