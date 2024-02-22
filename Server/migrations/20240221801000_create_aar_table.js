/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .then(() => {
      return knex.schema.createTable('AAR', function(table) {
        table.uuid('AAR_ID').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('AAR_Name');
        table.string('AAR_Location');
        table.date('AAR_Activity_Date');
        table.float('AAR_Duration');
        table.uuid('Event_ID').unique().defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('User_ID');
        table.foreign('User_ID').references('User.User_ID');
      })
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function(knex) {
  return knex.schema.alterTable('AAR', function(table) {
    table.dropForeign('User_ID');
  })
  .then (function() {
    return knex.schema.dropTableIfExists('AAR');
  })
  .then(() => knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"'));
};