/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Equipment').del()
  await knex('Equipment').insert([
    {Equipment_ID: '12345678-1234-5678-9012-345678901236', Equipment_Event_Type: 'Equipment', Equipment_Event_Option: 'Equipment Type'},
    {Equipment_ID: '98765432-5432-1098-7654-321098765434', Equipment_Event_Type: 'Equipment', Equipment_Event_Option: 'Equipment Status'}
  ]);
};
