import express from 'express';
import knex from 'knex';
import knexfile from './knexfile.js';
import { config } from 'dotenv';
config();

// SERVER CONFIGURATION
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3001;
const db = knex(knexfile[process.env.NODE_ENV || 'development']);

// MIDDLEWARE
app.use(express.json());
app.use('/', router);

// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`Something broke! Here's what went wrong: ${err.message}`);
});

// MAIN SERVER ROUTE
app.get("/", (req, res, next) => {
    try {
        res.send("Welcome to the Server!");
    } catch (err) {
        next({ message: 'Error occurred while handling / route', originalError: err });
    }
});

// PORT Listener
app.listen(PORT, (err) => {
    if (err) {
        console.error(`Error occurred while starting the server: ${err.message}`);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});

// TESTING ROUTE
app.get("/test", (req, res, next) => {
    try {
        res.send("Why are you here?");
    } catch (err) {
        next({ message: 'Error occurred while handling /test route', originalError: err });
    }
});

// DATABASE ROUTES
app.get("/llc", async (req, res, next) => {
    try {
        const aar = await db.select().from('AAR');
        if (!aar) {
            throw new Error('No data found in AAR');
        }
        res.json(aar);
    } catch (err) {
        next({ message: `Error occurred while fetching data from AAR: ${err.message}`, originalError: err });
    }
});

router.post('/llc', async (req, res) => {
    const { eventTitle, eventType, eventDate, eventLocation, commentsForSustain, commentsForImprove } = req.body;

    try {
      // Start a transaction because we're making multiple related changes
      await db.transaction(async trx => {
        const [aarId] = await trx('AAR').insert({
          AAR_Name: eventTitle,
          AAR_Location: eventLocation,
          AAR_Activity_Date: eventDate,
          // You'll need to add the User_ID and Event_ID here, too
        }).returning('AAR_ID');

        const [commentSustainId] = await trx('Comment').insert({
          Comment_Type: 'Sustain',
          Comment_Discussion: commentsForSustain,
          // Add the other Comment fields here
        }).returning('Comment_ID');

        const [commentImproveId] = await trx('Comment').insert({
          Comment_Type: 'Improve',
          Comment_Discussion: commentsForImprove,
          // Add the other Comment fields here
        }).returning('Comment_ID');

        await trx('AAR_Comment').insert([
          { AAR_ID: aarId, Comment_ID: commentSustainId },
          { AAR_ID: aarId, Comment_ID: commentImproveId },
        ]);
      });

      res.json({ message: 'AAR and comments successfully created' });
    } catch (err) {
      res.status(500).json({ message: `Error occurred while inserting data: ${err.message}` });
    }
  });