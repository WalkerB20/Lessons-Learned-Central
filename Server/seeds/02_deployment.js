/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Deployment').del()
  await knex('Deployment').insert([
    {Deployment_ID: '00000000-0000-0000-0000-000000000006', GCC: "Items", Pre_deployment: "Gear Inspection", Packing_list: "Rations", Equipment: "Rifles", Post_deployment: "Debriefing", Event_Type: "GCC"},
    {Deployment_ID: '00000000-0000-0000-0000-000000000007', GCC: "Items", Pre_deployment: "Preparation Brief", Packing_list: "Medical Supplies", Equipment: "Body Armor", Post_deployment: "After Action Review", Event_Type: "Pre-Deployment"},
    {Deployment_ID: '00000000-0000-0000-0000-000000000008', GCC: "Items", Pre_deployment: "Equipment Check", Packing_list: "Communication Devices", Equipment: "Night Vision Goggles", Post_deployment: "Feedback Session", Event_Type: "Packing List"},
    {Deployment_ID: '00000000-0000-0000-0000-000000000009', GCC: "Items", Pre_deployment: "Scenario Overview", Packing_list: "Tactical Gear", Equipment: "Helmets", Post_deployment: "Evaluation", Event_Type: "Equipment"},
    {Deployment_ID: '00000000-0000-0000-0000-000000000010', GCC: "Items", Pre_deployment: "Training Review", Packing_list: "Ammunition", Equipment: "Grenades", Post_deployment: "Performance Assessment", Event_Type: "Post-Deployment"},
  ]);
};
