/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Other').del()
  await knex('Other').insert([
    {Other_ID: '98765432-1234-5678-9101-112233445577', Other_Event_Type: 'Other', Other_Event_Option: 'Cargo Loading'},
  ]);
};
