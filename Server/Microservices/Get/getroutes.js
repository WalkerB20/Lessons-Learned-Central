import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { logUserAction, checkJwt } from '../../server.js';

config();

const router = express.Router();

const getroutes = (db) => {
  router.use(cors());
  router.use(express.json());
  router.options('*', cors());
  router.use(checkJwt);

router.get("/post", logUserAction('FETCH_POSTS'), (req, res, next) => {
  try {
      res.send("Your Posts are here!");
  } catch (err) {
      next({ message: 'Error occurred while handling / route', originalError: err });
  }
});

router.get('/postdata', logUserAction('FETCH_POST_DATA'), async (req, res, next) => {
  try {
      // Fetch data from the AAR table
      const aarData = await db.select('*').from('AAR');

      // Fetch data from the Sustain Comment table
      const sustainCommentData = await db.select('*').from('Sustain_Comment');

      // Fetch data from the Improve Comment table
      const improveCommentData = await db.select('*').from('Improve_Comment');

      // Fetch data from the Range table
      const rangeData = await db.select('*').from('Range');

      // Fetch data from the Deployment table
      const deploymentData = await db.select('*').from('Deployment');

      // Fetch data from the FTX table
      const ftxData = await db.select('*').from('FTX');

      // Fetch data from the Equipment table
      const equipmentData = await db.select('*').from('Equipment');

      // Fetch data from the Airborne_Operation table
      const airborneOperationData = await db.select('*').from('Airborne');

      // Fetch data from the Other table
      const otherData = await db.select('*').from('Other');

      // Send the fetched data as a response
      res.json({
        aarData,
        sustainCommentData,
        improveCommentData,
        rangeData,
        deploymentData,
        ftxData,
        equipmentData,
        airborneOperationData,
        otherData
    });
} catch (err) {
    next({ message: 'Error occurred while fetching data', originalError: err });
}
});

return router;
};

export default getroutes;