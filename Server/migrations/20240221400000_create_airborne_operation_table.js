/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.createTable('Airborne_Operation', function(table) {
    table.increments('Airborne_Operation_ID').primary();
    table.string('Aircraft');
    table.string('JMPI');
    table.string('JM_rehearsals');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTableIfExists('Airborne_Operation');
};
