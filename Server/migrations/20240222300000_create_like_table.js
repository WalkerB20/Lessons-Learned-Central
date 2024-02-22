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
        table.uuid('Comment_ID');
        table.foreign('Comment_ID').references('Comment.Comment_ID');
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
    table.dropForeign('Comment_ID');
  })
  .then (function() {
    return knex.schema.dropTableIfExists('Like');
  })
  .then(() => knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"'));
};