/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Range').del()
  await knex('Range').insert([
    {Range_ID: '87543290-2134-5678-9012-345678901234', Range_Event_Type: 'Range', Range_Event_Option: 'M4', Range_Event_Other: ''},
    {Range_ID: '54321098-9876-5432-1098-765432109876', Range_Event_Type: 'Range', Range_Event_Option: '240B', Range_Event_Other: ''},
    {Range_ID: '98765432-1234-5678-1234-567890123456', Range_Event_Type: 'Range', Range_Event_Option: '320', Range_Event_Other: ''},
    {Range_ID: '23456789-8765-4321-9876-543210987654', Range_Event_Type: 'Range', Range_Event_Option: 'M9', Range_Event_Other: ''},
    {Range_ID: '67890123-2109-8765-4321-098765432109', Range_Event_Type: 'Range', Range_Event_Option: 'Other', Range_Event_Other: '50 Cal'}
  ]);
};
