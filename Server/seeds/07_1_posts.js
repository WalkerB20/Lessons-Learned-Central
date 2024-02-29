/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Posts').del()
  await knex('Posts').insert([
    {Post_ID: '3e57b77e-5934-4687-8f5b-4b266e413b3a', Title: 'Strategic Advancements in Modern Warfare', Content: 'An in-depth analysis of the strategic advancements in modern warfare, exploring how technology and tactics have evolved over the years', User_ID: '12345678-1234-5678-9012-345678901240', Created_At: '2022-03-01 10:15:30', Updated_At: '2022-03-02 14:20:45'},
    {Post_ID: 'a6a86ca1-ea3d-4f1c-b67a-93e2c3e1b221', Title: 'The Evolution of Military Technology', Content: 'A comprehensive review of the evolution of military technology, from the invention of gunpowder to the development of drones and AI', User_ID: '98765432-5432-1098-7654-321098765438', Created_At: '2022-01-15 16:35:50', Updated_At: '2022-02-10 18:40:55'},
    {Post_ID: '7e442e8a-2f2c-4b3a-a7a4-1424fd4e3c75', Title: 'Unsung Heroes: Stories from the Front Lines', Content: 'A collection of personal stories and experiences from soldiers on the front lines, highlighting their bravery and dedication.', User_ID: '87654321-2109-8765-4321-098765432115', Created_At: '2021-12-20 20:45:10', Updated_At: '2022-01-05 22:50:15'},
    {Post_ID: '5e33df51-0dd8-4552-8b8a-2b9a676f2135', Title: 'The Role of Intelligence in Military Success', Content: 'A detailed examination of the role of intelligence in military operations, including case studies of successful intelligence-led missions.', User_ID: '56789012-1098-7654-3210-987654321104', Created_At: '2022-02-25 12:55:20', Updated_At: '2022-03-03 15:00:25'},
    {Post_ID: '9b5e7a29-14dd-4ea8-9c1b-8ba8c67e4e53', Title: 'Understanding the Impact of Military Tactics', Content: 'A study on the impact of various military tactics on the outcome of battles and wars, with a focus on historical examples.', User_ID: '43210987-5432-1098-7654-321098765438', Created_At: '2022-01-10 17:05:30', Updated_At: '2022-02-05 19:10:35'}
  ]);
};
