/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('User').del()
  await knex('User').insert([
    {User_ID: '00000000-0000-0000-0000-000000000030', User_email: "user1@example.com"},
    {User_ID: '00000000-0000-0000-0000-000000000031', User_email: "user2@example.com"},
    {User_ID: '00000000-0000-0000-0000-000000000032', User_email: "user3@example.com"},
    {User_ID: '00000000-0000-0000-0000-000000000033', User_email: "user4@example.com"},
    {User_ID: '00000000-0000-0000-0000-000000000034', User_email: "user5@example.com"}
  ]);
};
