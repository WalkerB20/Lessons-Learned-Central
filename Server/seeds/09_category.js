/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Category').del()
  await knex('Category').insert([
    {Category_ID: '00000000-0000-0000-0000-000000000040', Range_ID: '00000000-0000-0000-0000-000000000001', Deployment_ID: '00000000-0000-0000-0000-000000000006', FTX_ID: '00000000-0000-0000-0000-000000000011', Equipment_ID: '00000000-0000-0000-0000-000000000016', Airborne_ID: '00000000-0000-0000-0000-000000000021', Other_ID: '00000000-0000-0000-0000-000000000026'}
  ]);
};
