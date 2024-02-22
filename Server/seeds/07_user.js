/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('User').del()
  await knex('User').insert([
    {User_ID: '00000000-0000-0000-0000-000000000030', User_email: "user1@example.com"}
  ]);
};
