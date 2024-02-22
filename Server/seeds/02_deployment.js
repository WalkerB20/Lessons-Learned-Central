/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Deployment').del()
  await knex('Deployment').insert([
    {Deployment_ID: '00000000-0000-0000-0000-000000000006', Event_Type: 'Deployment'},
  ]);
};
