import cors from 'cors';
import express from 'express';
import { logUserAction, jwtCheck } from '../../server.js';
import { auth } from 'express-oauth2-jwt-bearer';

const router = express.Router();

const deleteroutes = (db) => {
  router.use(jwtCheck);
  router.use(cors());
  router.use(express.json());
  router.options('*', cors());

// ROUTE TO DECREMENT LIKE_COUNT FOR SUSTAIN COMMENT
router.delete("/sustain/:commentId", logUserAction('UNLIKE_SUSTAIN_COMMENT'), async (req, res, next) => {
  const { commentId } = req.params;
  try {
    await db('Sustain_Comment')
      .where('Sustain_Comment_ID', commentId)
      .decrement('Like_Count', 1);
    const updatedComment = await db('Sustain_Comment')
      .where('Sustain_Comment_ID', commentId)
      .first();
    res.json({ success: true, message: 'Decremented Like_Count for Sustain_Comment', likeCount: updatedComment.Like_Count});
  } catch (err) {
    next({ message: 'Error occurred while decrementing Like_Count for Sustain_Comment', originalError: err });
  }
});

// ROUTE TO DECREMENT LIKE_COUNT FOR IMPROVE COMMENT
router.delete("/improve/:commentId", logUserAction('UNLIKE_IMPROVE_COMMENT'), async (req, res, next) => {
  const { commentId } = req.params;
  try {
    await db('Improve_Comment')
      .where('Improve_Comment_ID', commentId)
      .decrement('Like_Count', 1);
    const updatedComment = await db('Improve_Comment')
      .where('Improve_Comment_ID', commentId)
      .first();
    res.json({ success: true, message: 'Decremented Like_Count for Improve_Comment', likeCount: updatedComment.Like_Count});
  } catch (err) {
    next({ message: 'Error occurred while decrementing Like_Count for Improve_Comment', originalError: err });
  }
});

  // DELETE a like from Improve_Comment
  router.delete('/postdelete/:aarId', logUserAction('DELETE_POST'), async (req, res, next) => {
    const { aarId } = req.params;
    console.log(`Received DELETE request for ID: ${aarId}`); // Log the received ID
    try {
      // Start a transaction
      await db.transaction(async trx => {
        // Get the AAR_Category_IDs associated with the AAR_ID from the AAR_Category table
        const aarCategories = await trx('AAR_Category').where('AAR_ID', aarId).select('AAR_Category_ID');

        // Delete from the AAR_Comment table
        for (let aarCategory of aarCategories) {
          await trx('AAR_Comment').where('AAR_Category_ID', aarCategory.AAR_Category_ID).del();
        }

        // Delete from the AAR_Category table
        await trx('AAR_Category').where('AAR_ID', aarId).del();

        // Delete from the Event_Category table
        const [{ Event_ID }] = await trx('AAR').where('AAR_ID', aarId).select('Event_ID');
        await trx('Event_Category').where('Event_ID', Event_ID).del();

        // Delete from the AAR table
        const rowsDeleted = await trx('AAR').where('AAR_ID', aarId).del();
        console.log(`Deleted ${rowsDeleted} rows`); // Log the number of deleted rows
      });
      res.json({ success: true, message: 'AAR entry and associated data deleted successfully' });
    } catch (err) {
      console.error('Error occurred while deleting AAR entry and associated data:', err);
      res.status(500).json({ success: false, message: 'Failed to delete AAR entry and associated data' });
    }
  });

  return router;
};

export default deleteroutes;