/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('FTX').del()
  await knex('FTX').insert([
    {FTX_ID: '00000000-0000-0000-0000-000000000011', Modules: "Survival Techniques", Prep_training: "Outdoor Survival Skills", Packing_list: "Field Rations"},
    {FTX_ID: '00000000-0000-0000-0000-000000000012', Modules: "Reconnaissance", Prep_training: "Map Reading", Packing_list: "Camouflage Gear"},
    {FTX_ID: '00000000-0000-0000-0000-000000000013', Modules: "Ambush Tactics", Prep_training: "Night Operations", Packing_list: "Field Stoves"},
    {FTX_ID: '00000000-0000-0000-0000-000000000014', Modules: "Urban Warfare", Prep_training: "Close Quarters Combat", Packing_list: "Urban Camouflage"},
    {FTX_ID: '00000000-0000-0000-0000-000000000015', Modules: "Counterinsurgency", Prep_training: "Civilian Interaction", Packing_list: "Non-lethal Weapons"}
  ]);
};
