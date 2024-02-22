/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .then(() => {
      return knex.schema.createTable('AAR_Category', function(table) {
        table.uuid('AAR_Category_ID').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('Category_ID');
        table.foreign('Category_ID').references('Category.Category_ID');
        table.uuid('AAR_ID');
        table.foreign('AAR_ID').references('AAR.AAR_ID');
      })
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function(knex) {
  return knex.schema.alterTable('AAR_Category', function(table) {
    table.dropForeign('Category_ID');
    table.dropForeign('AAR_ID');
  })
  .then (function() {
    return knex.schema.dropTableIfExists('AAR_Category');
  })
  .then(() => knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"'));
};