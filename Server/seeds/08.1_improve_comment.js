/**
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Improve_Comment').del()
  await knex('Improve_Comment').insert([
    {Improve_Comment_ID: '00000000-0000-0000-0000-000000000135', Improve_Comment_Type: "Feedback", Improve_Comment_Title: "Excellent Training Session", Improve_Comment_Discussion: "The training session was well-organized and highly informative.", Improve_Comment_Recommendation: "Consider incorporating more scenario-based exercises."}
  ]);
};
