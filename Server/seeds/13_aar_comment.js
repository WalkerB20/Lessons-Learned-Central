/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('AAR_Comment').del()
  await knex('AAR_Comment').insert([
    {AAR_Comment_ID: '00000000-0000-0000-0000-000000000065', AAR_Category_ID: '00000000-0000-0000-0000-000000000060', Sustain_Comment_ID: '00000000-0000-0000-0000-000000000035', Improve_Comment_ID: '00000000-0000-0000-0000-000000000135'}
  ]);
};
