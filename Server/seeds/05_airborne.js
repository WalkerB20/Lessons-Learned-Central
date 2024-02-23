/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Airborne').del()
  await knex('Airborne').insert([
    {Airborne_ID: '00000000-0000-0000-0000-000000000021', Airborne_Event_Type: 'Airborne Operations', Airborne_Event_Option: 'JMPI'}
  ]);
};
