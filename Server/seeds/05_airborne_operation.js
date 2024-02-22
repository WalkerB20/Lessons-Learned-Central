/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Airborne_Operation').del()
  await knex('Airborne_Operation').insert([
    {Airborne_Operation_ID: '00000000-0000-0000-0000-000000000021', Jump_Manifest: "C-130", Jump_Status: "Active", Jump_Equipment: "Uniform", Jump_Safety: "", JM_rehearsals: "Conducted", JMPI: "Scheduled", Event_Type: "Jump Manifest"},
    {Airborne_Operation_ID: '00000000-0000-0000-0000-000000000022', Jump_Manifest: "Chinook", Jump_Status: null, Jump_Equipment: "Uniform", Jump_Safety: "", JM_rehearsals: "Scheduled", JMPI: "Scheduled", Event_Type: "Jump Status"},
    {Airborne_Operation_ID: '00000000-0000-0000-0000-000000000023', Jump_Manifest: "Black Hawk", Jump_Status: "Active", Jump_Equipment: "Uniform", Jump_Safety: "", JM_rehearsals: "Not Conducted", JMPI: "Scheduled", Event_Type: "Jump Equipment"},
    {Airborne_Operation_ID: '00000000-0000-0000-0000-000000000124', Jump_Manifest: "Osprey", Jump_Status: null, Jump_Equipment: "Uniform", Jump_Safety: "", JM_rehearsals: "Conducted", JMPI: "Scheduled", Event_Type: "JM Safety"},
    {Airborne_Operation_ID: '00000000-0000-0000-0000-000000000024', Jump_Manifest: "Osprey", Jump_Status: null, Jump_Equipment: "Uniform", Jump_Safety: "", JM_rehearsals: "Conducted", JMPI: "Scheduled", Event_Type: "JM Rehearsals"},
    {Airborne_Operation_ID: '00000000-0000-0000-0000-000000000025', Jump_Manifest: "Apache", Jump_Status: "Active", Jump_Equipment: "Uniform", Jump_Safety: "", JM_rehearsals: "Scheduled", JMPI: "Scheduled", Event_Type: "JMPI"},
  ]);
};
