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
  try {
      await db.transaction(async trx => {
          // Update the AAR table
          await trx('AAR').where('AAR_ID', aarId).update({
              AAR_Name: updatedData.eventTitle,
              AAR_Location: updatedData.eventLocation,
              AAR_Activity_Date: updatedData.eventDate,
              // Add other fields as necessary
          });

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
          await trx(dbEventType).where(`${dbEventType}_ID`, updatedData.eventId).update({
              [`${dbEventType}_Event_Type`]: updatedData.eventType,
              [`${dbEventType}_Event_Option`]: updatedData.additionalOptions,
              [`${dbEventType}_Event_Other`]: updatedData.additionalInput
              // Add other fields as necessary
          });

          // Send the response
          res.status(200).send(`AAR with ID ${aarId} has been successfully updated`);
      });

  } catch (error) {
      next(error);
  }
}
);

    return router;
};

export default patchroutes;