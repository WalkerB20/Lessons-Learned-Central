import express from 'express';
import cors from 'cors';

const router = express.Router();

const patchroutes = (db) => {
  router.use(cors());
  router.use(express.json());
  router.options('*', cors());

  router.patch('/postpatch/:aarId', async (req, res, next) => {
    const aarId = req.params.aarId;
    const updatedData = req.body;

    console.log(updatedData);
    try {
      await db.transaction(async trx => {
        // Check if AAR_Activity_Date is a valid date
        if (Date.parse(updatedData.AAR_Activity_Date)) {
          // Update the AAR table
          await trx('AAR').where('AAR_ID', aarId).update({
            AAR_Name: updatedData.AAR_Name,
            AAR_Location: updatedData.AAR_Location,
            AAR_Activity_Date: updatedData.AAR_Activity_Date,
            // Add other fields as necessary
          });
        } else {
          // Handle invalid date
          console.error('Invalid date:', updatedData.AAR_Activity_Date);
          return; // Skip the rest of the transaction
        }

        // Update the Comment table
        await Promise.all(updatedData.sections.map(async section => {
          await trx(`${section.type.charAt(0).toUpperCase() + section.type.slice(1)}_Comment`).where(`${section.type.charAt(0).toUpperCase() + section.type.slice(1)}_Comment_ID`, section.id).update({
            [`${section.type.charAt(0).toUpperCase() + section.type.slice(1)}_Comment_Type`]: section.type,
            [`${section.type.charAt(0).toUpperCase() + section.type.slice(1)}_Comment_Title`]: section.title,
            [`${section.type.charAt(0).toUpperCase() + section.type.slice(1)}_Comment_Discussion`]: section.comments,
            [`${section.type.charAt(0).toUpperCase() + section.type.slice(1)}_Comment_Recommendation`]: section.recommendations
            // Add other fields as necessary
          });
        }));

        // Convert eventType to match database table naming convention
        const formattedEventType = updatedData.eventType.replace(/([a-z])([A-Z])/g, '$1_$2');
        const dbEventType = formattedEventType.charAt(0).toUpperCase() + formattedEventType.slice(1);

        // Update the specific event table
       // Send the response
        res.status(200).send(`AAR with ID ${aarId} has been successfully updated`);
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  return router;
};

export default patchroutes;