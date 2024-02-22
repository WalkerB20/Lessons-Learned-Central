/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Equipment').del()
  await knex('Equipment').insert([
    {Equipment_ID: '00000000-0000-0000-0000-000000000016', Type: "Radio", Status: "Operational"},
    {Equipment_ID: '00000000-0000-0000-0000-000000000017', Type: "Night Vision Goggles", Status: "Under Maintenance"},
    {Equipment_ID: '00000000-0000-0000-0000-000000000018', Type: "Body Armor", Status: "In Stock"},
    {Equipment_ID: '00000000-0000-0000-0000-000000000019', Type: "Rifles", Status: "Issued"},
    {Equipment_ID: '00000000-0000-0000-0000-000000000020', Type: "Grenades", Status: "Low Inventory"}
  ]);
};
