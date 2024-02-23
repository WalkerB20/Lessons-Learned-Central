/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Deployment').del()
  await knex('Deployment').insert([
    {Deployment_ID: '00000000-0000-0000-0000-000000000006', Deployment_Event_Type: 'Deployment', Deployment_Event_Option: 'Deployment 1', Deployment_Event_Other: 'Other'},
  ]);
};
