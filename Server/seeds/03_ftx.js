/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('FTX').del()
  await knex('FTX').insert([
    {FTX_ID: '12345678-1234-5678-9012-345678901235', FTX_Event_Type: 'FTX', FTX_Event_Option: 'Training Site', FTX_Event_Other: ''},
    {FTX_ID: '98765432-5432-1098-7654-321098765433', FTX_Event_Type: 'FTX', FTX_Event_Option: 'Logistics', FTX_Event_Other: ''},
    {FTX_ID: '87654321-2109-8765-4321-098765432110', FTX_Event_Type: 'FTX', FTX_Event_Option: 'Training Modules', FTX_Event_Other: ''},
    {FTX_ID: '56789012-1098-7654-3210-987654321099', FTX_Event_Type: 'FTX', FTX_Event_Option: 'Lead-up Training', FTX_Event_Other: ''},
    {FTX_ID: '43210987-5432-1098-7654-321098765433', FTX_Event_Type: 'FTX', FTX_Event_Option: 'Packing List', FTX_Event_Other: ''},
    {FTX_ID: '43210987-5432-1098-7654-321098653674', FTX_Event_Type: 'FTX', FTX_Event_Option: 'Other', FTX_Event_Other: 'Post Training Review'},
  ]);
};
