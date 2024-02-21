/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('User').del()
  await knex('User').insert([
    {User_ID: 1, User_email: "user1@example.com"},
    {User_ID: 2, User_email: "user2@example.com"},
    {User_ID: 3, User_email: "user3@example.com"},
    {User_ID: 4, User_email: "user4@example.com"},
    {User_ID: 5, User_email: "user5@example.com"}
  ]);
};
