/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('User').del()
  await knex('User').insert([
    {User_ID: '12345678-1234-5678-9012-345678901240', User_Email: "susanadams@army.com"},
    {User_ID: '98765432-5432-1098-7654-321098765438', User_Email: "robertmartinez@army.com"},
    {User_ID: '87654321-2109-8765-4321-098765432115', User_Email: "amycampbell@army.com"},
    {User_ID: '56789012-1098-7654-3210-987654321104', User_Email: "kevinthompson@army.com"},
    {User_ID: '43210987-5432-1098-7654-321098765438', User_Email: "rachelgreen@army.com"}
  ]);
};
