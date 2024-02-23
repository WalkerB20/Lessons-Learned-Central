/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Like').del()
  await knex('Like').insert([
    {Like_ID: '00000000-0000-0000-0000-000000000070', User_ID: '00000000-0000-0000-0000-000000000030', Sustain_Comment_ID: '00000000-0000-0000-0000-000000000035', Improve_Comment_ID: '00000000-0000-0000-0000-000000000135'}
  ]);
};
