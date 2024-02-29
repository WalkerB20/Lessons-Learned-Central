/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('UserActions').del()
  await knex('UserActions').insert([
    {Action_ID: '3e57b77b-37bf-4ff7-b8c2-f9e0b1e3bbf8', User_ID: '12345678-1234-5678-9012-345678901240', Post_ID: '3e57b77e-5934-4687-8f5b-4b266e413b3a', Action_Type: 'Like', Action_Timestamp: '2022-03-01 10:15:30', Like_ID: '89765432-1234-5678-9101-112233445566'},
    {Action_ID: '6a7ed891-bb13-4b6e-b058-ffe8d641b23b', User_ID: '98765432-5432-1098-7654-321098765438', Post_ID: 'a6a86ca1-ea3d-4f1c-b67a-93e2c3e1b221', Action_Type: 'Like', Action_Timestamp: '2022-01-15 16:35:50', Like_ID: '23456789-9876-5432-1098-765432109876'},
    {Action_ID: '7b8e4771-2a21-4b74-aed3-5b0deda3c5a7', User_ID: '87654321-2109-8765-4321-098765432115', Post_ID: '7e442e8a-2f2c-4b3a-a7a4-1424fd4e3c75', Action_Type: 'Like', Action_Timestamp: '2021-12-20 20:45:10', Like_ID: '54321098-8765-4321-9876-543210987654'},
    {Action_ID: '9a2b331d-625b-4a8e-8a2f-5c3b3e8a8a64', User_ID: '56789012-1098-7654-3210-987654321104', Post_ID: '5e33df51-0dd8-4552-8b8a-2b9a676f2135', Action_Type: 'Like', Action_Timestamp: '2022-02-25 12:55:20', Like_ID: '87654321-2109-8765-4321-098765432187'},
    {Action_ID: '5e4b7cdf-8f56-4e3e-b4a7-4a6f4a3a2e5e', User_ID: '43210987-5432-1098-7654-321098765438', Post_ID: '9b5e7a29-14dd-4ea8-9c1b-8ba8c67e4e53', Action_Type: 'Like', Action_Timestamp: '2022-01-10 17:05:30', Like_ID: '98765432-4321-9876-5432-109876543210'}
  ]);
};