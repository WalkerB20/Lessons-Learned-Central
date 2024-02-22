/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Range').del()
  await knex('Range').insert([
    {Range_ID: '00000000-0000-0000-0000-000000000001', Event_Type: 'M4'},
    {Range_ID: '00000000-0000-0000-0000-000000000002', Event_Type: '240B'},
    {Range_ID: '00000000-0000-0000-0000-000000000003', Event_Type: '320'},
    {Range_ID: '00000000-0000-0000-0000-000000000004', Event_Type: 'M9'},
    {Range_ID: '00000000-0000-0000-0000-000000000005', Event_Type: 'Other'},
  ]);
};
