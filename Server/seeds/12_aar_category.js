/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('AAR_Category').del()
  await knex('AAR_Category').insert([
    {AAR_Category_ID: 1, AAR_ID: 1, Category_ID: 3},
    {AAR_Category_ID: 2, AAR_ID: 2, Category_ID: 2},
    {AAR_Category_ID: 3, AAR_ID: 3, Category_ID: 1},
    {AAR_Category_ID: 4, AAR_ID: 4, Category_ID: 4},
    {AAR_Category_ID: 5, AAR_ID: 5, Category_ID: 5}
  ]);
};
