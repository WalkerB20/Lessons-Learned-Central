/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Deployment').del()
  await knex('Deployment').insert([
    {Deployment_ID: '12345678-1234-5678-9012-345678901234', Deployment_Event_Type: 'Deployment', Deployment_Event_Option: 'GCC', Deployment_Event_Other: ''},
    {Deployment_ID: '98765432-5432-1098-7654-321098765432', Deployment_Event_Type: 'Deployment', Deployment_Event_Option: 'Pre-deployment', Deployment_Event_Other: ''},
    {Deployment_ID: '87654321-2109-8765-4321-098765432109', Deployment_Event_Type: 'Deployment', Deployment_Event_Option: 'Packing List', Deployment_Event_Other: ''},
    {Deployment_ID: '56789012-1098-7654-3210-987654321098', Deployment_Event_Type: 'Deployment', Deployment_Event_Option: 'Equipment', Deployment_Event_Other: ''},
    {Deployment_ID: '43210987-5432-1098-7654-321098765432', Deployment_Event_Type: 'Deployment', Deployment_Event_Option: 'Post-deployment', Deployment_Event_Other: ''},
    {Deployment_ID: '43210987-5432-1098-7654-321098765433', Deployment_Event_Type: 'Deployment', Deployment_Event_Option: 'Other', Deployment_Event_Other: 'Post-deployment Review'},
  ]);
};
