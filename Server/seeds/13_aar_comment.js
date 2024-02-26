/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('AAR_Comment').del()
  await knex('AAR_Comment').insert([
    {AAR_Comment_ID: '67492038-2190-4682-8371-293847109265', AAR_Category_ID: '98765432-9876-5432-1098-765432109876', Sustain_Comment_ID: '12345678-1234-5678-9012-345678901241', Improve_Comment_ID: '12345678-1234-5678-9012-345678901242'},
    {AAR_Comment_ID: '58203947-5648-9283-7491-102938475612', AAR_Category_ID: '87654321-8765-4321-2109-876543210987', Sustain_Comment_ID: '98765432-5432-1098-7654-321098765439', Improve_Comment_ID: '98765432-5432-1098-7654-321098765440'},
    {AAR_Comment_ID: '49027518-6384-1092-8473-562938401752', AAR_Category_ID: '76543210-7654-3210-9876-543210987654', Sustain_Comment_ID: '87654321-2109-8765-4321-098765432116', Improve_Comment_ID: '87654321-2109-8765-4321-098765432117'},
    {AAR_Comment_ID: '21938756-9847-5729-1038-625748192037', AAR_Category_ID: '65432109-6543-2109-8765-432109876543', Sustain_Comment_ID: '56789012-1098-7654-3210-987654321105', Improve_Comment_ID: '56789012-1098-7654-3210-987654321106'},
    {AAR_Comment_ID: '83746291-5739-2018-4927-648291037564', AAR_Category_ID: '54321098-5432-1098-7654-321098765432', Sustain_Comment_ID: '43210987-5432-1098-7654-321098765439', Improve_Comment_ID: '43210987-5432-1098-7654-321098765440'}
  ]);
};
