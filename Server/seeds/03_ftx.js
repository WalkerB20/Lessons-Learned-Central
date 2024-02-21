/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('FTX').del()
  await knex('FTX').insert([
    {FTX_ID: 1, Modules: "Survival Techniques", Prep_training: "Outdoor Survival Skills", Packing_list: "Field Rations"},
    {FTX_ID: 2, Modules: "Reconnaissance", Prep_training: "Map Reading", Packing_list: "Camouflage Gear"},
    {FTX_ID: 3, Modules: "Ambush Tactics", Prep_training: "Night Operations", Packing_list: "Field Stoves"},
    {FTX_ID: 4, Modules: "Urban Warfare", Prep_training: "Close Quarters Combat", Packing_list: "Urban Camouflage"},
    {FTX_ID: 5, Modules: "Counterinsurgency", Prep_training: "Civilian Interaction", Packing_list: "Non-lethal Weapons"}
  ]);
};
