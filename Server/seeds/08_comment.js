/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Comment').del()
  await knex('Comment').insert([
    {Comment_ID: '00000000-0000-0000-0000-000000000035', Comment_Type: "Feedback", Comment_Title: "Excellent Training Session", Comment_Discussion: "The training session was well-organized and highly informative.", Comment_Recommendation: "Consider incorporating more scenario-based exercises."}
  ]);
};
