/**
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Improve_Comment').del()
  await knex('Improve_Comment').insert([
    {Improve_Comment_ID: '12345678-1234-5678-9012-345678901242', Improve_Comment_Type: "Improve", Improve_Comment_Title: "Interactive Workshop Feedback", Improve_Comment_Discussion: "The workshop fostered active participation and engagement.", Improve_Comment_Recommendation: "Introduce more group activities and discussions."},
    {Improve_Comment_ID: '98765432-5432-1098-7654-321098765440', Improve_Comment_Type: "Improve", Improve_Comment_Title: "Effective Leadership Training", Improve_Comment_Discussion: "The leadership training provided valuable insights and practical tools.", Improve_Comment_Recommendation: "Include opportunities for peer-to-peer mentoring."},
    {Improve_Comment_ID: '87654321-2109-8765-4321-098765432117', Improve_Comment_Type: "Improve", Improve_Comment_Title: "Team Building Retreat Evaluation", Improve_Comment_Discussion: "The retreat strengthened team dynamics and communication.", Improve_Comment_Recommendation: "Incorporate outdoor team-building activities."},
    {Improve_Comment_ID: '56789012-1098-7654-3210-987654321106', Improve_Comment_Type: "Improve", Improve_Comment_Title: "Customer Satisfaction Workshop Review", Improve_Comment_Discussion: "The workshop addressed key customer concerns and provided practical solutions.", Improve_Comment_Recommendation: "Include case studies from diverse industries."},
    {Improve_Comment_ID: '43210987-5432-1098-7654-321098765440', Improve_Comment_Type: "Improve", Improve_Comment_Title: "Innovative Product Training Assessment", Improve_Comment_Discussion: "The training session introduced innovative concepts and techniques effectively.", Improve_Comment_Recommendation: "Incorporate more hands-on experimentation."}
  ]);
};
