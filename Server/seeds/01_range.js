/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Range').del()
  await knex('Range').insert([
    {Range_ID: '00000000-0000-0000-0000-000000000001', Range_Event_Type: 'Live Fire Exercise', Range_Event_Option: 'Range 1', Range_Event_Other: 'Pistol'},
  ]);
};
