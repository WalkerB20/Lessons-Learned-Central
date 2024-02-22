/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .then(() => {
      return knex.schema.createTable('Comment', function(table) {
        table.uuid('Comment_ID').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('Comment_Type');
        table.string('Comment_Title');
        table.text('Comment_Discussion');
        table.text('Comment_Recommendation');
      })
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function(knex) {
  return knex.schema.dropTableIfExists('Comment')
    .then(() => knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"'));
};