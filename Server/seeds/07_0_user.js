/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('User').del()
  await knex('User').insert([
    {User_ID: '12345678-1234-5678-9012-345678901240', User_Email: "susanadams@army.com", Auth0_ID: "auth0|65e102ca3a906f0fbe8b71ec"},
    {User_ID: '98765432-5432-1098-7654-321098765438', User_Email: "robertmartinez@army.com", Auth0_ID: "auth0|65e10335507279d4529cf8c5"},
    {User_ID: '87654321-2109-8765-4321-098765432115', User_Email: "amycampbell@army.com", Auth0_ID: "auth0|65e10375507279d4529cf911"},
    {User_ID: '56789012-1098-7654-3210-987654321104', User_Email: "kevinthompson@army.com", Auth0_ID: "auth0|65e103a6f722389b76505ec6"},
    {User_ID: '43210987-5432-1098-7654-321098765438', User_Email: "rachelgreen@army.com", Auth0_ID: "auth0|65e103cca54d24662c0b4053"}
  ]);
};
