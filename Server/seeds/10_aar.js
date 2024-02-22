/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('AAR').del()
  await knex('AAR').insert([
    {AAR_ID: '00000000-0000-0000-0000-000000000045', AAR_Name: "Operation Eagle Eye", AAR_Location: "Training Grounds", AAR_Activity_Date: "2024-02-20", AAR_Duration: 2, Event_ID: '00000000-0000-0000-0000-000000000050', User_ID: '00000000-0000-0000-0000-000000000030'},
    {AAR_ID: '00000000-0000-0000-0000-000000000046', AAR_Name: "Night Ops Exercise", AAR_Location: "Field Base", AAR_Activity_Date: "2024-02-18", AAR_Duration: 1.5, Event_ID: '00000000-0000-0000-0000-000000000051', User_ID: '00000000-0000-0000-0000-000000000031'},
    {AAR_ID: '00000000-0000-0000-0000-000000000047', AAR_Name: "Urban Warfare Simulation", AAR_Location: "City Streets", AAR_Activity_Date: "2024-02-15", AAR_Duration: 1, Event_ID: '00000000-0000-0000-0000-000000000052', User_ID: '00000000-0000-0000-0000-000000000032'},
    {AAR_ID: '00000000-0000-0000-0000-000000000048', AAR_Name: "Jungle Survival Training", AAR_Location: "Forest Reserve", AAR_Activity_Date: "2024-02-10", AAR_Duration: 2.5, Event_ID: '00000000-0000-0000-0000-000000000053', User_ID: '00000000-0000-0000-0000-000000000033'},
    {AAR_ID: '00000000-0000-0000-0000-000000000049', AAR_Name: "Mountain Reconnaissance", AAR_Location: "High Altitudes", AAR_Activity_Date: "2024-02-12", AAR_Duration: 1.75, Event_ID: '00000000-0000-0000-0000-000000000054', User_ID: '00000000-0000-0000-0000-000000000034'}
  ]);
};
