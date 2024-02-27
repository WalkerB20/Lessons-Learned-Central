import cors from 'cors';
import express from 'express';
import pkgJwt from 'express-jwt';
import pkgJwksRsa from 'jwks-rsa';
import { config } from 'dotenv';

config();

const router = express.Router();
const { jwt } = pkgJwt;
const { jwksRsa } = pkgJwksRsa;

const deleteroutes = (db) => {
  router.use(cors());
  router.use(express.json());
  router.options('*', cors());

  router.delete('/postdelete/:aarId', async (req, res, next) => {
    const { aarId } = req.params;
    try {
        // Start a transaction
        await db.transaction(async trx => {
            // Delete from the AAR table
            await trx('AAR').where('AAR_ID', aarId).del();
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