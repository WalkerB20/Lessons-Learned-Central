import express from 'express';
import cors from 'cors';
import { logUserAction, jwtCheck } from '../../server.js';
import { auth } from 'express-oauth2-jwt-bearer';

const router = express.Router();

// MIDDLEWARE TO GET DATA
const getroutes = (db) => {
  router.use(jwtCheck);
  router.use(cors());
  router.use(express.json());
  router.options('*', cors());

  // ROUTE TO IMPROVE COMMENT DATA
  router.get("/improve", async (req, res, next) => {
    try {
      const improveCommentData = await db.select('*').from('Improve_Comment');
      res.json(improveCommentData);
    } catch (err) {
      next({ message: 'Error occurred while fetching improve comment data', originalError: err });
    }
  });

  // ROUTE TO SUSTAIN COMMENT DATA
  router.get("/sustain", async (req, res, next) => {
    try {
      const sustainCommentData = await db.select('*').from('Sustain_Comment');
      res.json(sustainCommentData);
    } catch (err) {
      next({ message: 'Error occurred while fetching sustain comment data', originalError: err });
    }
  });

  // ROUTE TO POST DATA FOR FEED
  router.get('/postdata', async (req, res, next) => {
    try {
      const aarData = await db.select('*').from('AAR');
      const sustainCommentData = await db.select('*').from('Sustain_Comment');
      const improveCommentData = await db.select('*').from('Improve_Comment');
      const rangeData = await db.select('*').from('Range');
      const deploymentData = await db.select('*').from('Deployment');
      const ftxData = await db.select('*').from('FTX');
      const equipmentData = await db.select('*').from('Equipment');
      const airborneOperationData = await db.select('*').from('Airborne');
      const otherData = await db.select('*').from('Other');

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