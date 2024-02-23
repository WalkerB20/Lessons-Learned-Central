/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Airborne_Operation').del()
  await knex('Airborne_Operation').insert([
    {Airborne_Operation_ID: '00000000-0000-0000-0000-000000000021', Event_Type: 'Airborne_Operation'}
  ]);
};
