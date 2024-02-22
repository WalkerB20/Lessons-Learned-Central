/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .then(() => {
      return knex.schema.createTable('User', function(table) {
        table.uuid('User_ID').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('User_email');
      })
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function(knex) {
  return knex.schema.dropTableIfExists('User')
    .then(() => knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"'));
};