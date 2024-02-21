/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Equipment').del()
  await knex('Equipment').insert([
    {Equipment_ID: 1, Type: "Radio", Status: "Operational"},
    {Equipment_ID: 2, Type: "Night Vision Goggles", Status: "Under Maintenance"},
    {Equipment_ID: 3, Type: "Body Armor", Status: "In Stock"},
    {Equipment_ID: 4, Type: "Rifles", Status: "Issued"},
    {Equipment_ID: 5, Type: "Grenades", Status: "Low Inventory"}
  ]);
};
