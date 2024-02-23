/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('AAR_Category').del()
  await knex('AAR_Category').insert([
    {AAR_Category_ID: '00000000-0000-0000-0000-000000000060', AAR_ID: '00000000-0000-0000-0000-000000000045', Category_ID: '00000000-0000-0000-0000-000000000040'}
  ]);
};
