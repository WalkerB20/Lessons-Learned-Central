/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Event_Category').del()
  await knex('Event_Category').insert([
    {Event_Category_ID: 1, Category_ID: 1, Event_ID: 1},
    {Event_Category_ID: 2, Category_ID: 2, Event_ID: 2},
    {Event_Category_ID: 3, Category_ID: 3, Event_ID: 3},
    {Event_Category_ID: 4, Category_ID: 4, Event_ID: 4},
    {Event_Category_ID: 5, Category_ID: 5, Event_ID: 5}
  ]);
};
