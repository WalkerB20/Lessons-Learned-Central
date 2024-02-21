/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Category').del()
  await knex('Category').insert([
    {Category_ID: 1, Range_ID: 1, Deployment_ID: 2, FTX_ID: null, Equipment_ID: 3, Airborne_Operation_ID: null, Other_ID: null},
    {Category_ID: 2, Range_ID: null, Deployment_ID: 3, FTX_ID: 2, Equipment_ID: null, Airborne_Operation_ID: null, Other_ID: null},
    {Category_ID: 3, Range_ID: null, Deployment_ID: null, FTX_ID: 4, Equipment_ID: null, Airborne_Operation_ID: 1, Other_ID: null},
    {Category_ID: 4, Range_ID: 2, Deployment_ID: null, FTX_ID: null, Equipment_ID: 1, Airborne_Operation_ID: null, Other_ID: null},
    {Category_ID: 5, Range_ID: null, Deployment_ID: 4, FTX_ID: null, Equipment_ID: 4, Airborne_Operation_ID: null, Other_ID: 2}
  ]);
};
