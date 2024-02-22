/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Comment').del()
  await knex('Comment').insert([
    {Comment_ID: '00000000-0000-0000-0000-000000000035', Comment_Type: "Feedback", Comment_Title: "Excellent Training Session", Comment_Discussion: "The training session was well-organized and highly informative.", Comment_Recommendation: "Consider incorporating more scenario-based exercises."},
    {Comment_ID: '00000000-0000-0000-0000-000000000036', Comment_Type: "Report", Comment_Title: "Equipment Malfunction", Comment_Discussion: "One of the radios malfunctioned during the operation.", Comment_Recommendation: "Regular maintenance checks are needed to prevent such issues."},
    {Comment_ID: '00000000-0000-0000-0000-000000000037', Comment_Type: "Suggestion", Comment_Title: "Improved Communication", Comment_Discussion: "Better communication protocols are required during night operations.", Comment_Recommendation: "Implement clearer communication channels and practice signal codes."},
    {Comment_ID: '00000000-0000-0000-0000-000000000038', Comment_Type: "Observation", Comment_Title: "Efficient Deployment", Comment_Discussion: "The deployment team efficiently set up the equipment within the given timeframe.", Comment_Recommendation: "Maintain the current level of preparedness and coordination."},
    {Comment_ID: '00000000-0000-0000-0000-000000000039', Comment_Type: "Review", Comment_Title: "AAR Feedback", Comment_Discussion: "The After Action Review provided valuable insights into our performance.", Comment_Recommendation: "Ensure all participants actively contribute to the discussion."},
  ]);
};
