/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('AAR').del()
  await knex('AAR').insert([
    {AAR_ID: 1, AAR_Name: "Operation Eagle Eye", AAR_Location: "Training Grounds", AAR_Activity_Date: "2024-02-20", AAR_Duration: 2, Event_ID: 1, User_ID: 3},
    {AAR_ID: 2, AAR_Name: "Night Ops Exercise", AAR_Location: "Field Base", AAR_Activity_Date: "2024-02-18", AAR_Duration: 1.5, Event_ID: 2, User_ID: 5},
    {AAR_ID: 3, AAR_Name: "Urban Warfare Simulation", AAR_Location: "City Streets", AAR_Activity_Date: "2024-02-15", AAR_Duration: 1, Event_ID: 3, User_ID: 2},
    {AAR_ID: 4, AAR_Name: "Jungle Survival Training", AAR_Location: "Forest Reserve", AAR_Activity_Date: "2024-02-10", AAR_Duration: 2.5, Event_ID: 4, User_ID: 1},
    {AAR_ID: 5, AAR_Name: "Mountain Reconnaissance", AAR_Location: "High Altitudes", AAR_Activity_Date: "2024-02-12", AAR_Duration: 1.75, Event_ID: 5, User_ID: 4}
  ]);
};
