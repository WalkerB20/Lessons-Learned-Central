/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable('UserActions', function(table) {
      table.uuid('Action_ID').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('Action_Type', 50);
      table.timestamp('Action_Timestamp').defaultTo(knex.fn.now());
      table.uuid('Post_ID');
      table.foreign('Post_ID').references('Posts.Post_ID');
      table.uuid('User_ID');
      table.foreign('User_ID').references('User.User_ID');
      table.uuid('Like_ID');
      table.foreign('Like_ID').references('Like.Like_ID');
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function(knex) {
  return knex.schema.alterTable('UserActions', function(table) {
    table.dropForeign('Post_ID');
    table.dropForeign('User_ID');
    table.dropForeign('Like_ID');
  })
  .then (function() {
    return knex.schema.dropTableIfExists('UserActions');
  })
  .then(() => knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"'));
};
