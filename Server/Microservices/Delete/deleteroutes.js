import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

const deleteroutes = (db) => {
  router.use(cors());
  router.use(express.json());
  router.options('*', cors());

  router.delete('/postdelete/:aarId', async (req, res, next) => {
    const { aarId } = req.params;
      // Extract the JWT from the Authorization header
  const token = req.headers.authorization.split(' ')[1];

  // Decode the JWT to get the user's ID
  const decodedToken = jwt.verify(token, YOUR_JWT_SECRET);
  const userId = decodedToken.sub;
    try {
        // Start a transaction
        await db.transaction(async trx => {
            // Delete from the AAR table
            await trx('AAR').where('AAR_ID', aarId).andWhere('User_ID', userId).del();
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