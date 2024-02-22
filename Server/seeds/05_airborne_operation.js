/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Airborne_Operation').del()
  await knex('Airborne_Operation').insert([
    {Airborne_Operation_ID: '00000000-0000-0000-0000-000000000021', Aircraft: "C-130", JMPI: "Completed", JM_rehearsals: "Conducted"},
    {Airborne_Operation_ID: '00000000-0000-0000-0000-000000000022', Aircraft: "Chinook", JMPI: "Pending", JM_rehearsals: "Scheduled"},
    {Airborne_Operation_ID: '00000000-0000-0000-0000-000000000023', Aircraft: "Black Hawk", JMPI: "Completed", JM_rehearsals: "Not Conducted"},
    {Airborne_Operation_ID: '00000000-0000-0000-0000-000000000024', Aircraft: "Osprey", JMPI: "Completed", JM_rehearsals: "Conducted"},
    {Airborne_Operation_ID: '00000000-0000-0000-0000-000000000025', Aircraft: "Apache", JMPI: "Pending", JM_rehearsals: "Scheduled"}
  ]);
};
