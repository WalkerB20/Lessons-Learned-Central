/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Equipment').del()
  await knex('Equipment').insert([
    {Equipment_ID: '00000000-0000-0000-0000-000000000016', Equipment_Type: "Radio", Equipment_Status: "Operational", Event_Type: "Equipment Type"},
    {Equipment_ID: '00000000-0000-0000-0000-000000000017', Equipment_Type: "Night Vision Goggles", Equipment_Status: "Under Maintenance", Event_Type: "Equipment Status"},
    {Equipment_ID: '00000000-0000-0000-0000-000000000018', Equipment_Type: "Body Armor", Equipment_Status: "In Stock"},
    {Equipment_ID: '00000000-0000-0000-0000-000000000019', Equipment_Type: "Rifles", Equipment_Status: "Issued"},
    {Equipment_ID: '00000000-0000-0000-0000-000000000020', Equipment_Type: "Grenades", Equipment_Status: "Low Inventory"},
  ]);
};
