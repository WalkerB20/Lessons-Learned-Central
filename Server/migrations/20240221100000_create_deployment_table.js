/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .then(() => {
      return knex.schema.createTable('Deployment', function(table) {
        table.uuid('Deployment_ID').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('GCC');
        table.string('Pre_deployment');
        table.string('Packing_list');
        table.string('Equipment');
        table.string('Post_deployment');
        table.string('Event_Type');
      })
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function(knex) {
  return knex.schema.dropTableIfExists('Deployment')
    .then(() => knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"'));
};