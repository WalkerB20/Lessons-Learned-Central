/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('AAR_Comment').del()
  await knex('AAR_Comment').insert([
    {AAR_Comment_ID: 1, AAR_Category_ID: 1, Comment_ID: 2},
    {AAR_Comment_ID: 2, AAR_Category_ID: 2, Comment_ID: 4},
    {AAR_Comment_ID: 3, AAR_Category_ID: 3, Comment_ID: 1},
    {AAR_Comment_ID: 4, AAR_Category_ID: 4, Comment_ID: 3},
    {AAR_Comment_ID: 5, AAR_Category_ID: 5, Comment_ID: 5}
  ]);
};
