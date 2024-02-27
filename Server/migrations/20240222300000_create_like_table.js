/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .then(() => {
      return knex.schema.createTable('Like', function(table) {
        table.uuid('Like_ID').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('User_ID');
        table.foreign('User_ID').references('User.User_ID');
        table.uuid('Sustain_Comment_ID');
        table.foreign('Sustain_Comment_ID').references('Sustain_Comment.Sustain_Comment_ID');
        table.uuid('Improve_Comment_ID');
        table.foreign('Improve_Comment_ID').references('Improve_Comment.Improve_Comment_ID');
        table.integer('Post_ID');
        table.foreign('Post_ID').references('Posts.Post_ID');
      })
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function(knex) {
  return knex.schema.alterTable('Like', function(table) {
    table.dropForeign('User_ID');
    table.dropForeign('Sustain_Comment_ID');
    table.dropForeign('Improve_Comment_ID');
  })
  .then (function() {
    return knex.schema.dropTableIfExists('Like');
  })
  .then(() => knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"'));
};