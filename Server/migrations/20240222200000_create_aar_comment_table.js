/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .then(() => {
      return knex.schema.createTable('AAR_Comment', function(table) {
        table.uuid('AAR_Comment_ID').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('AAR_Category_ID');
        table.foreign('AAR_Category_ID').references('AAR_Category.AAR_Category_ID');
        table.uuid('Sustain_Comment_ID');
        table.foreign('Sustain_Comment_ID').references('Sustain_Comment.Sustain_Comment_ID');
        table.uuid('Improve_Comment_ID');
        table.foreign('Improve_Comment_ID').references('Improve_Comment.Improve_Comment_ID');
      })
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function(knex) {
  return knex.schema.alterTable('AAR_Comment', function(table) {
    table.dropForeign('AAR_Category_ID');
    table.dropForeign('Sustain_Comment_ID');
    table.dropForeign('Improve_Comment_ID');
  })
  .then (function() {
    return knex.schema.dropTableIfExists('AAR_Comment');
  })
  .then(() => knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"'));
};