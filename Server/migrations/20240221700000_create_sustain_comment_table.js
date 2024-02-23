/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .then(() => {
      return knex.schema.createTable('Sustain_Comment', function(table) {
        table.uuid('Sustain_Comment_ID').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('Sustain_Comment_Type');
        table.string('Sustain_Comment_Title');
        table.text('Sustain_Comment_Discussion');
        table.text('Sustain_Comment_Recommendation');
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