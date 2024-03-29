/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .then(() => {
      return knex.schema.createTable('Other', function(table) {
        table.uuid('Other_ID').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('Other_Event_Type', 255);
        table.string('Other_Event_Option', 255);
      })
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function(knex) {
  return knex.schema.dropTableIfExists('Other')
    .then(() => knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"'));
};