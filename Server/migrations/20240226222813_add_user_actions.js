/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable('UserActions', function(table) {
      table.increments('action_id').primary();
      table.string('user_id').notNullable();
      table.integer('post_id').nullable();
      table.string('action_type', 50).notNullable();
      table.timestamp('action_timestamp').defaultTo(knex.fn.now());
      table.foreign('post_id').references('Posts.post_id'); // Optional: Ensure 'Posts' table exists and 'post_id' is the correct column
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.dropTable('UserActions');
};
