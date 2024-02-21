/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Deployment').del()
  await knex('Deployment').insert([
    {Deployment_ID: 1, Pre_deployment: "Gear Inspection", Packing_list: "Rations", Equipment: "Rifles", Post_deployment: "Debriefing"},
    {Deployment_ID: 2, Pre_deployment: "Preparation Brief", Packing_list: "Medical Supplies", Equipment: "Body Armor", Post_deployment: "After Action Review"},
    {Deployment_ID: 3, Pre_deployment: "Equipment Check", Packing_list: "Communication Devices", Equipment: "Night Vision Goggles", Post_deployment: "Feedback Session"},
    {Deployment_ID: 4, Pre_deployment: "Scenario Overview", Packing_list: "Tactical Gear", Equipment: "Helmets", Post_deployment: "Evaluation"},
    {Deployment_ID: 5, Pre_deployment: "Training Review", Packing_list: "Ammunition", Equipment: "Grenades", Post_deployment: "Performance Assessment"},
  ]);
};
