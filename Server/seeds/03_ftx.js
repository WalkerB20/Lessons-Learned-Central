/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('FTX').del()
  await knex('FTX').insert([
    {FTX_ID: '00000000-0000-0000-0000-000000000011', FTX_Event_Type: 'FTX', FTX_Event_Option: 'Packing List', FTX_Event_Other: null},
  ]);
};
