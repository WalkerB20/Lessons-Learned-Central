/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .then(() => {
      return knex.schema.createTable('Event_Category', function(table) {
        table.uuid('Event_Category_ID').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('Event_ID');
        table.foreign('Event_ID').references('AAR.Event_ID');
        table.uuid('Category_ID');
        table.foreign('Category_ID').references('Category.Category_ID');
      })
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function(knex) {
  return knex.schema.alterTable('Event_Category', function(table) {
    table.dropForeign('Category_ID');
    table.dropForeign('Event_ID');
  })
  .then (function() {
    return knex.schema.dropTableIfExists('Event_Category');
  })
  .then(() => knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"'));
};