/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .then(() => {
      return knex.schema.createTable('Equipment', function(table) {
        table.uuid('Equipment_ID').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('Equipment_Type');
        table.string('Equipment_Status');
        table.string('Event_Type');
      })
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function(knex) {
  return knex.schema.dropTableIfExists('Equipment')
    .then(() => knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"'));
};