/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('FTX').del()
  await knex('FTX').insert([
    {FTX_ID: '00000000-0000-0000-0000-000000000011', Training_Site: "Survival Techniques", Logistics: "Outdoor Survival Skills", Training_Modules: "Field Rations", Lead_up_Training: "Basic Training", Packing_list: "1", Event_Type: "Training Site"},
    {FTX_ID: '00000000-0000-0000-0000-000000000012', Training_Site: "Reconnaissance", Logistics: "Map Reading", Training_Modules: "Camouflage Gear", Lead_up_Training: "Basic Leadership", Packing_list: "2", Event_Type: "Logistics"},
    {FTX_ID: '00000000-0000-0000-0000-000000000013', Training_Site: "Ambush Tactics", Logistics: "Night Operations", Training_Modules: "Field Stoves", Lead_up_Training: "Basic Training", Packing_list: "3", Event_Type: "Training Modules"},
    {FTX_ID: '00000000-0000-0000-0000-000000000014', Training_Site: "Urban Warfare", Logistics: "Close Quarters Combat", Training_Modules: "Urban Camouflage", Lead_up_Training: "Basic Training", Packing_list: "4", Event_Type: "Lead-up Training"},
    {FTX_ID: '00000000-0000-0000-0000-000000000015', Training_Site: "Counterinsurgency", Logistics: "Civilian Interaction", Training_Modules: "Non-lethal Weapons", Lead_up_Training: "Basic Training", Packing_list: "5", Event_Type: "Packing List"},
  ]);
};
