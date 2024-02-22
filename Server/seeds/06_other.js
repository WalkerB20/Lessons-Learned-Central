/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Other').del()
  await knex('Other').insert([
    {Other_ID: '00000000-0000-0000-0000-000000000026', Other_Type: "Radio"},
    {Other_ID: '00000000-0000-0000-0000-000000000027', Other_Type: "Statioin"},
    {Other_ID: '00000000-0000-0000-0000-000000000028', Other_Type: "Mic"},
    {Other_ID: '00000000-0000-0000-0000-000000000029', Other_Type: "Rafle"},
    {Other_ID: '00000000-0000-0000-0000-000000000030', Other_Type: "Grenade"},
  ]);
};
