/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.createTable('AAR', function(table) {
    table.increments('AAR_ID').primary();
    table.string('AAR_Name');
    table.string('AAR_Location');
    table.date('AAR_Activity_Date');
    table.integer('AAR_Duration');
    table.integer('Event_ID').unique();
    table.integer('User_ID').unsigned();
    table.foreign('User_ID').references('User.User_ID');
});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.alterTable('AAR', function(table) {
    table.dropForeign('User_ID');
  })
  .then (function() {
    return knex.schema.dropTableIfExists('AAR');
  });
};