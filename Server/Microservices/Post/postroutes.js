import express from 'express';
import cors from 'cors';

const router = express.Router();

const postroutes = (db) => {
  router.use(cors());
  router.use(express.json());
  router.options('*', cors());

// POST FOR EVENTS IN FORM DATA AARCOMPONENTS.JSX
router.post('/form', async (req, res, next) => {
  const formData = req.body;
  try {
      // Start a transaction
      await db.transaction(async trx => {
// Insert the improve comment into the Improve_Comment table and get the inserted ID
const [improveCommentResult] = await trx('Improve_Comment').insert({
    Improve_Comment_Discussion: formData.improveComment
  }, 'Improve_Comment_ID');
  const improveCommentId = improveCommentResult.Improve_Comment_ID;

  // Insert the sustain comment into the Sustain_Comment table and get the inserted ID
  const [sustainCommentResult] = await trx('Sustain_Comment').insert({
    Sustain_Comment_Discussion: formData.sustainComment
  }, 'Sustain_Comment_ID');
  const sustainCommentId = sustainCommentResult.Sustain_Comment_ID;

        // Insert into the AAR table and get the inserted ID
        const [aarId] = await trx('AAR').insert({
              AAR_Name: formData.eventTitle,
              AAR_Location: formData.eventLocation,
              AAR_Activity_Date: formData.eventDate,
              Sustain_Comment_ID: sustainCommentId,
              Improve_Comment_ID: improveCommentId,
              // Add other fields as necessary
        }, 'AAR_ID');

          // Insert into the Comment table and get the inserted ID
          const commentIds = await Promise.all(formData.sections.map(async section => {
              const [commentId] = await trx(`${section.type.charAt(0).toUpperCase() + section.type.slice(1)}_Comment`).insert({
                  [`${section.type.charAt(0).toUpperCase() + section.type.slice(1)}_Comment_Type`]: section.type,
                  [`${section.type.charAt(0).toUpperCase() + section.type.slice(1)}_Comment_Title`]: section.title,
                  [`${section.type.charAt(0).toUpperCase() + section.type.slice(1)}_Comment_Discussion`]: section.comments,
                  [`${section.type.charAt(0).toUpperCase() + section.type.slice(1)}_Comment_Recommendation`]: section.recommendations
                  // Add other fields as necessary
              }).returning(`${section.type.charAt(0).toUpperCase() + section.type.slice(1)}_Comment_ID`);

              // Insert into the AAR_Comment table
              await trx('AAR_Comment').insert({
                  AAR_Comment_ID: aarId[0],
                  [`${section.type.charAt(0).toUpperCase() + section.type.slice(1)}_Comment_ID`]: commentId[0]
              });

              return commentId;
          }));

          // Convert eventType to match database table naming convention
          const formattedEventType = formData.eventType.replace(/([a-z])([A-Z])/g, '$1_$2');
          const dbEventType = formattedEventType.charAt(0).toUpperCase() + formattedEventType.slice(1);

          // Insert into the specific event table and get the inserted ID
          const [eventId] = await trx(dbEventType).insert({
              [`${dbEventType}_Event_Type`]: formData.eventType,
              [`${dbEventType}_Event_Option`]: formData.additionalOptions,
              [`${dbEventType}_Event_Other`]: formData.additionalInput
              // Add other fields as necessary
          }).returning(`${dbEventType}_ID`);

          // Insert into the Category table and get the inserted ID
          const [categoryId] = await trx('Category').insert({
              [`${dbEventType}_ID`]: eventId[0]
              // Add other fields as necessary
          }).returning('Category_ID');

          // Insert into the AAR_Category table
          await trx('AAR_Category').insert({
              AAR_ID: aarId[0],
              Category_ID: categoryId[0]
          });
      });

      res.json({ success: true, message: 'Data inserted successfully' });
    } catch (err) {
        next({ message: 'Error occurred while inserting data', originalError: err });
      }
    });

    return router;
};

export default postroutes;