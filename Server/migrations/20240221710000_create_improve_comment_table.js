/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .then(() => {
      return knex.schema.createTable('Improve_Comment', function(table) {
        table.uuid('Improve_Comment_ID').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('Improve_Comment_Type');
        table.string('Improve_Comment_Title');
        table.text('Improve_Comment_Discussion');
        table.text('Improve_Comment_Recommendation');
        table.integer('Like_Count').defaultTo(0);
      })
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function(knex) {
  return knex.schema.dropTableIfExists('Improve_Comment')
    .then(() => knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"'));
};