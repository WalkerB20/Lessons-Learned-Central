/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Airborne').del()
  await knex('Airborne').insert([
    {Airborne_ID: '12345678-1234-5678-9012-345678901238', Airborne_Event_Type: 'Airborne Operations', Airborne_Event_Option: 'Jump Manifest'},
    {Airborne_ID: '98765432-5432-1098-7654-321098765436', Airborne_Event_Type: 'Airborne Operations', Airborne_Event_Option: 'Jump Status'},
    {Airborne_ID: '87654321-2109-8765-4321-098765432113', Airborne_Event_Type: 'Airborne Operations', Airborne_Event_Option: 'Jump Equipment'},
    {Airborne_ID: '56789012-1098-7654-3210-987654321102', Airborne_Event_Type: 'Airborne Operations', Airborne_Event_Option: 'Jump Safety'},
    {Airborne_ID: '43210987-5432-1098-7654-321098765436', Airborne_Event_Type: 'Airborne Operations', Airborne_Event_Option: 'Jumpmaster Rehearsals'},
    {Airborne_ID: '76543210-9876-5432-1098-765432109876', Airborne_Event_Type: 'Airborne Operations', Airborne_Event_Option: 'JMPI'}
  ]);
};
