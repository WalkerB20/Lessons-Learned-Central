import express from 'express';
import cors from 'cors';
import { logUserAction, jwtCheck } from '../../server.js';
import { auth } from 'express-oauth2-jwt-bearer';

const router = express.Router();

// MIDDLEWARE IMPORTS
const postroutes = (db) => {
  router.use(jwtCheck);
  router.use(cors());
  router.use(express.json());
  router.options('*', cors());

// ROUTE TO INCREMENT LIKE_COUNT FOR SUSTAIN COMMENT
router.post("/sustain/:commentId", async (req, res, next) => {
  const { commentId } = req.params;
  try {
    await db('Sustain_Comment')
      .where('Sustain_Comment_ID', commentId)
      .increment('Like_Count', 1);
    const updatedComment = await db('Sustain_Comment')
      .where('Sustain_Comment_ID', commentId)
      .first();
    res.json({ success: true, message: 'Incremented Like_Count for Sustain_Comment', likeCount: updatedComment.Like_Count });
  } catch (err) {
    next({ message: 'Error occurred while incrementing Like_Count for Sustain_Comment', originalError: err });
  }
});

// ROUTE TO INCREMENT LIKE_COUNT FOR IMPROVE COMMENT
router.post("/improve/:commentId", async (req, res, next) => {
  const { commentId } = req.params;
  try {
    await db('Improve_Comment')
      .where('Improve_Comment_ID', commentId)
      .increment('Like_Count', 1);
    const updatedComment = await db('Improve_Comment')
      .where('Improve_Comment_ID', commentId)
      .first();
    res.json({ success: true, message: 'Incremented Like_Count for Improve_Comment', likeCount: updatedComment.Like_Count});
  } catch (err) {
    next({ message: 'Error occurred while incrementing Like_Count for Improve_Comment', originalError: err });
  }
});

  // POST ROUTE TO INSERT FORM DATA
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
          const insertResult = await trx(tableName)
          .insert(insertData, `${columnPrefix}_ID`)
          .then((ids) => ids[0][`${columnPrefix}_ID`]);
          if (type === 'sustain') {
            sustainCommentId = insertResult;
          } else if (type === 'improve') {
            improveCommentId = insertResult;
          }
        }
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
