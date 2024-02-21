/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Equipment').del()
  await knex('Equipment').insert([
    {Airborne_Operation_ID: 1, Aircraft: "C-130", JMPI: "Completed", JM_rehearsals: "Conducted"},
    {Airborne_Operation_ID: 2, Aircraft: "Chinook", JMPI: "Pending", JM_rehearsals: "Scheduled"},
    {Airborne_Operation_ID: 3, Aircraft: "Black Hawk", JMPI: "Completed", JM_rehearsals: "Not Conducted"},
    {Airborne_Operation_ID: 4, Aircraft: "Osprey", JMPI: "Completed", JM_rehearsals: "Conducted"},
    {Airborne_Operation_ID: 5, Aircraft: "Apache", JMPI: "Pending", JM_rehearsals: "Scheduled"}
  ]);
};
