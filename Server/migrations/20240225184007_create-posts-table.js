/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable('Posts', function(table) {
        table.increments('Post_ID').primary(); // Primary key for the Posts table.
        table.string('Title').notNullable(); // Title of the post.
        table.text('Content').notNullable(); // Content of the post, using text type for longer text.
        table.uuid('User_ID').unsigned().notNullable(); // Foreign key to the User table.
        table.foreign('User_ID').references('User.User_ID'); // Establishing the foreign key relationship.
        table.timestamp('Created_At').defaultTo(knex.fn.now()); // Timestamp for when the post is created.
        table.timestamp('Updated_At').defaultTo(knex.fn.now()); // Timestamp for when the post is updated.
      });
    };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.dropTable('Posts');
};
