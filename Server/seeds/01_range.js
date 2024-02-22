/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Range').del()
  await knex('Range').insert([
    {Range_ID: '00000000-0000-0000-0000-000000000001', Event_Type: 'Live Fire Exercise'},
    {Range_ID: '00000000-0000-0000-0000-000000000002', Event_Type: 'Urban Warefare Training'},
    {Range_ID: '00000000-0000-0000-0000-000000000003', Event_Type: 'Night Vision Exercise'},
    {Range_ID: '00000000-0000-0000-0000-000000000004', Event_Type: 'Close Quarters Combat'},
    {Range_ID: '00000000-0000-0000-0000-000000000005', Event_Type: 'Sniper Training'},
  ]);
};
