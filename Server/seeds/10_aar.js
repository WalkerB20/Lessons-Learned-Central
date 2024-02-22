/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('AAR').del()
  await knex('AAR').insert([
    {AAR_ID: '00000000-0000-0000-0000-000000000045', AAR_Name: "Operation Eagle Eye", AAR_Location: "Training Grounds", AAR_Activity_Date: "2024-02-20", Event_ID: '00000000-0000-0000-0000-000000000050', User_ID: '00000000-0000-0000-0000-000000000030'}
  ]);
};
