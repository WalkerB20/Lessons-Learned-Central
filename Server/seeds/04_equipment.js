/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Equipment').del()
  await knex('Equipment').insert([
    {Equipment_ID: '00000000-0000-0000-0000-000000000016', Equipment_Event_Type: 'Equipment', Equipment_Event_Option: 'Equipment Type'}
  ]);
};
