/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .then(() => {
      return knex.schema.createTable('Airborne_Operation', function(table) {
        table.uuid('Airborne_Operation_ID').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('Jump_Manifest');
        table.string('Jump_Status');
        table.string('Jump_Equipment');
        table.string('Jump_Safety');
        table.string('JM_rehearsals');
        table.string('JMPI');
        table.string('Event_Type');
      })
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function(knex) {
  return knex.schema.dropTableIfExists('Airborne_Operation')
    .then(() => knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"'));
};