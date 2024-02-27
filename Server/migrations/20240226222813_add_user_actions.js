/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable('UserActions', function(table) {
      table.increments('Action_ID').primary();
      table.uuid('User_ID').notNullable();
      table.integer('Post_ID').nullable();
      table.string('Action_Type', 50).notNullable();
      table.timestamp('Action_Timestamp').defaultTo(knex.fn.now());
      table.foreign('Post_ID').references('Posts.Post_ID'); // Optional: Ensure 'Posts' table exists and 'post_id' is the correct column
      table.foreign('User_ID').references('User.User_ID');
      table.uuid('Like_ID').nullable();
      table.foreign('Like_ID').references('Like.Like_ID');
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.dropTable('UserActions');
};
