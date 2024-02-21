/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Like').del()
  await knex('Like').insert([
    {Like_ID: 1, User_ID: 2, Comment_ID: 1},
    {Like_ID: 2, User_ID: 3, Comment_ID: 3},
    {Like_ID: 3, User_ID: 4, Comment_ID: 2},
    {Like_ID: 4, User_ID: 5, Comment_ID: 5},
    {Like_ID: 5, User_ID: 1, Comment_ID: 4}
  ]);
};
