/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Range').del()
  await knex('Range').insert([
    {Range_ID: 1, Event_Type: 'Live Fire Exercise'},
    {Range_ID: 2, Event_Type: 'Urban Warefare Training'},
    {Range_ID: 3, Event_Type: 'Night Vision Exercise'},
    {Range_ID: 4, Event_Type: 'Close Quarters Combat'},
    {Range_ID: 5, Event_Type: 'Sniper Training'},
  ]);
};
