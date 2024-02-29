import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { logUserAction, jwtCheck } from '../../server.js';

config();

const router = express.Router();

const postroutes = (db) => {
  router.use(cors());
  router.use(express.json());
  router.options('*', cors());
  router.use(jwtCheck);

  router.post('/form', async (req, res, next) => {
    const formData = req.body;

    try {
      await db.transaction(async trx => {
        let sustainCommentId = null;
        let improveCommentId = null;

        for (const section of formData.sections) {
          const { title, comments, recommendations, type } = section;
          let tableName, columnPrefix;

          if (type === 'sustain') {
            tableName = 'Sustain_Comment';
            columnPrefix = 'Sustain_Comment';
          } else if (type === 'improve') {
            tableName = 'Improve_Comment';
            columnPrefix = 'Improve_Comment';
          } else {
            throw new Error(`Unknown section type: ${type}`);
          }

          const insertData = {
            [`${columnPrefix}_Title`]: title,
            [`${columnPrefix}_Discussion`]: comments,
            [`${columnPrefix}_Recommendation`]: recommendations,
          };

          // Correctly handle the insert result to extract the UUID
          const insertResult = await trx(tableName)
          .insert(insertData, `${columnPrefix}_ID`)
          .then((ids) => ids[0][`${columnPrefix}_ID`]); // Correctly accessing the first element of the result

          if (type === 'sustain') {
            sustainCommentId = insertResult; // This should be a UUID string
          } else if (type === 'improve') {
            improveCommentId = insertResult; // This should be a UUID string
          }
        }

        // Insert into the AAR table with the captured comment IDs
        const [aarId] = await trx('AAR').insert({
          AAR_Name: formData.eventTitle,
          AAR_Location: formData.eventLocation,
          AAR_Activity_Date: formData.eventDate,
          Sustain_Comment_ID: sustainCommentId,
          Improve_Comment_ID: improveCommentId,
        }, 'AAR_ID');

        res.json({
          success: true,
          message: 'Data inserted successfully',
          data: {
            AAR_ID: aarId,
            Sustain_Comment_ID: sustainCommentId,
            Improve_Comment_ID: improveCommentId,
          }
        });
      });
    } catch (err) {
      console.error(err);
      next({ message: 'Error occurred while inserting data', originalError: err });
    }
  });

  return router;
};

export default postroutes;
