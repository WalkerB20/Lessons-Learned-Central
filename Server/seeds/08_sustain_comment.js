/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Sustain_Comment').del()
  await knex('Sustain_Comment').insert([
    {Sustain_Comment_ID: '00000000-0000-0000-0000-000000000035', Sustain_Comment_Type: "Feedback", Sustain_Comment_Title: "Excellent Training Session", Sustain_Comment_Discussion: "The training session was well-organized and highly informative.", Sustain_Comment_Recommendation: "Consider incorporating more scenario-based exercises."}
  ]);
};
