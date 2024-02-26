/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Sustain_Comment').del()
  await knex('Sustain_Comment').insert([
    {Sustain_Comment_ID: '12345678-1234-5678-9012-345678901241', Sustain_Comment_Type: "Sustain", Sustain_Comment_Title: "Equipment Maintenance Review", Sustain_Comment_Discussion: "The maintenance review lacked depth and clarity.", Sustain_Comment_Recommendation: "Include more hands-on demonstrations."},
    {Sustain_Comment_ID: '98765432-5432-1098-7654-321098765439', Sustain_Comment_Type: "Sustain", Sustain_Comment_Title: "Leadership Seminar Feedback", Sustain_Comment_Discussion: "The seminar lacked engagement and interaction.", Sustain_Comment_Recommendation: "Incorporate group discussions and case studies."},
    {Sustain_Comment_ID: '87654321-2109-8765-4321-098765432116', Sustain_Comment_Type: "Sustain", Sustain_Comment_Title: "Safety Drill Assessment", Sustain_Comment_Discussion: "The safety drill assessment was poorly executed.", Sustain_Comment_Recommendation: "Enhance communication protocols and practice scenarios."},
    {Sustain_Comment_ID: '56789012-1098-7654-3210-987654321105', Sustain_Comment_Type: "Sustain", Sustain_Comment_Title: "Team Building Workshop Evaluation", Sustain_Comment_Discussion: "The workshop lacked team-oriented activities and cohesion.", Sustain_Comment_Recommendation: "Incorporate more collaborative exercises and challenges."},
    {Sustain_Comment_ID: '43210987-5432-1098-7654-321098765439', Sustain_Comment_Type: "Sustain", Sustain_Comment_Title: "Customer Service Training Review", Sustain_Comment_Discussion: "The training session did not address real-world scenarios effectively.", Sustain_Comment_Recommendation: "Introduce role-playing exercises and case studies."}
  ]);
};
