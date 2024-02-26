/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('AAR').del()
  await knex('AAR').insert([
    {AAR_ID: '81423098-3512-8756-2398-204782063984', AAR_Name: "Operation Thunderstrike", AAR_Location: "Mountain Range", AAR_Activity_Date: "2024-03-15", Event_ID: '53928475-2398-9823-5723-482365019834', User_ID: '12345678-1234-5678-9012-345678901240', Sustain_Comment_ID: '12345678-1234-5678-9012-345678901241', Improve_Comment_ID: '12345678-1234-5678-9012-345678901242'},
    {AAR_ID: '65438290-1987-3476-8203-982573640198', AAR_Name: "Operation Midnight Raven", AAR_Location: "Urban Center", AAR_Activity_Date: "2024-04-10", Event_ID:  '78203945-2109-3245-5734-209873654123', User_ID: '98765432-5432-1098-7654-321098765438', Sustain_Comment_ID: '98765432-5432-1098-7654-321098765439', Improve_Comment_ID: '98765432-5432-1098-7654-321098765440'},
    {AAR_ID: '19823746-9834-5732-0978-109827346598', AAR_Name: "Operation Phoenix Rising", AAR_Location: "Desert Oasis", AAR_Activity_Date: "2024-05-05", Event_ID: '90237564-3276-8745-2398-509823746512', User_ID: '87654321-2109-8765-4321-098765432115', Sustain_Comment_ID: '87654321-2109-8765-4321-098765432116', Improve_Comment_ID: '87654321-2109-8765-4321-098765432117'},
    {AAR_ID: '23094857-9876-2345-9087-654321098765', AAR_Name: "Operation Ironclad", AAR_Location: "Coastal Region", AAR_Activity_Date: "2024-06-20", Event_ID: '23985764-9034-1234-8756-987654321098', User_ID: '56789012-1098-7654-3210-987654321104', Sustain_Comment_ID: '56789012-1098-7654-3210-987654321105', Improve_Comment_ID: '56789012-1098-7654-3210-987654321106'},
    {AAR_ID: '23987456-2345-9087-5678-098765432109', AAR_Name: "Operation Silver Fox", AAR_Location: "Arctic Base", AAR_Activity_Date: "2024-07-12", Event_ID:  '90345678-0987-4567-8902-345678901234', User_ID: '43210987-5432-1098-7654-321098765438', Sustain_Comment_ID: '43210987-5432-1098-7654-321098765439', Improve_Comment_ID: '43210987-5432-1098-7654-321098765440'}
  ]);
};
