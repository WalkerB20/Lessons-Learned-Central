/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Other').del()
  await knex('Other').insert([
    {Other_ID: '00000000-0000-0000-0000-000000000026', Event_Type: 'Other'}
  ]);
};
