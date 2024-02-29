import express from 'express';
import cors from 'cors';
import { logUserAction, jwtCheck } from '../../server.js';
import { auth } from 'express-oauth2-jwt-bearer';

const router = express.Router();

const patchroutes = (db) => {
  router.use(jwtCheck);
  router.use(cors());
  router.use(express.json());
  router.options('*', cors());

  router.patch('/postpatch/:aarId', logUserAction('UPDATE_AAR'), async (req, res, next) => {
    const aarId = req.params.aarId;
    const updatedData = req.body;
    console.log("Received data for AAR ID:", aarId);
    console.log("Updated data:", updatedData);
    try {
      await db.transaction(async trx => {
        // Update the AAR table
        await trx('AAR').where('AAR_ID', aarId).update({
          AAR_Name: updatedData.eventTitle,
          AAR_Location: updatedData.eventLocation,
          AAR_Activity_Date: updatedData.eventDate,
          // Add other fields as necessary
        });
        const updatedItem = await trx('AAR').where('AAR_ID', aarId).first();// Retrieve the updated item
        // Send the response
        res.status(200).json({ updatedItem, message: `AAR with ID ${aarId} has been successfully updated` });
      });
    } catch (error) {
      console.error("Error updating AAR:", error);
      res.status(500).send(error.message);
    }
  });
  return router;
};
export default patchroutes;