/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Other').del()
  await knex('Other').insert([
    {Other_ID: 1},
    {Other_ID: 2},
    {Other_ID: 4},
    {Other_ID: 5},
  ]);
};
