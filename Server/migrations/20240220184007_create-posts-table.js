/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable('Posts', function(table) {
        table.uuid('Post_ID').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('Title');
        table.text('Content');
        table.uuid('User_ID');
        table.foreign('User_ID').references('User.User_ID');
        table.timestamp('Created_At').defaultTo(knex.fn.now());
        table.timestamp('Updated_At').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function(knex) {
    return knex.schema.alterTable('Posts', function(table) {
      table.dropForeign('User_ID');
    })
    .then (function() {
      return knex.schema.dropTableIfExists('Posts');
    })
    .then(() => knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"'));
};