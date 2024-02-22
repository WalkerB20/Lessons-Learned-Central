/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Event_Category').del()
  await knex('Event_Category').insert([
    {Event_Category_ID: '00000000-0000-0000-0000-000000000055', Category_ID: '00000000-0000-0000-0000-000000000040', Event_ID: '00000000-0000-0000-0000-000000000050'}
  ]);
};
