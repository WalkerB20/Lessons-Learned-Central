import express from 'express';
import knex from 'knex';
import knexfile from './knexfile.js';
import { config } from 'dotenv';
import cors from 'cors';
config();

// SERVER CONFIGURATION
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3001;
const db = knex(knexfile[process.env.NODE_ENV || 'development']);


// MIDDLEWARE
app.use(cors());
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
app.get("/aar", (req, res, next) => {
    try {
        res.send("Welcome to the AAR route!");
    } catch (err) {
        next({ message: 'Error occurred while handling /test route', originalError: err });
    }
});

app.get('/aar/rangeItems', async (req, res) => {
  try {
    const rangeItems = await db.select('Event_Type').from('Range');
    res.json(rangeItems);
  } catch (err) {
    res.status(500).json({ message: `Error occurred while fetching range items: ${err.message}` });
  }
});

app.get('/aar/deploymentItems', async (req, res) => {
  try {
    const deploymentItems = await db.select('Event_Type').from('Deployment');
    res.json(deploymentItems);
  } catch (err) {
    res.status(500).json({ message: `Error occurred while fetching deployment items: ${err.message}` });
  }
});

app.get('/aar/ftxItems', async (req, res) => {
  try {
    const ftxItems = await db.select('Event_Type').from('FTX');
    res.json(ftxItems);
  } catch (err) {
    res.status(500).json({ message: `Error occurred while fetching ftx items: ${err.message}` });
  }
});

app.get('/aar/equipmentItems', async (req, res) => {
  try {
    const equipmentItems = await db.select('Event_Type').from('Equipment');
    res.json(equipmentItems);
  } catch (err) {
    res.status(500).json({ message: `Error occurred while fetching equipment items: ${err.message}` });
  }
});

app.get('/aar/airborneOpsItems', async (req, res) => {
  try {
    const airborneOpsItems = await db.select('Event_Type').from('Airborne_Operation');
    res.json(airborneOpsItems);
  } catch (err) {
    res.status(500).json({ message: `Error occurred while fetching Airborne Operation items: ${err.message}` });
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
  const { eventTitle, eventType, eventDate, eventLocation, commentsForSustain, commentsForImprove, categoryId, userId, eventId } = req.body;

  try {
    // Start a transaction because we're making multiple related changes
    await db.transaction(async trx => {

      const [aar] = await trx('AAR').insert({
        AAR_Name: eventTitle,
        AAR_Location: eventLocation,
        AAR_Activity_Date: eventDate,
        User_ID: userId,
        Event_ID: eventId,
      }).returning('AAR_ID');

      const aarId = aar.AAR_ID; // Extract the AAR_ID from the returned object

      // Insert data into the AAR_Category table
      const [aarCategory] = await trx('AAR_Category').insert({
        AAR_ID: aarId,
        Category_ID: categoryId
      }).returning('AAR_Category_ID');

      const aarCategoryId = aarCategory.AAR_Category_ID; // Extract the AAR_Category_ID from the returned object

      const [commentSustain] = await trx('Comment').insert({
        Comment_Type: 'Sustain',
        Comment_Discussion: commentsForSustain,
        // Add the other Comment fields here
      }).returning('Comment_ID');

      const commentSustainId = commentSustain.Comment_ID; // Extract the Comment_ID from the returned object

      const [commentImprove] = await trx('Comment').insert({
        Comment_Type: 'Improve',
        Comment_Discussion: commentsForImprove,
        // Add the other Comment fields here
      }).returning('Comment_ID');

      const commentImproveId = commentImprove.Comment_ID; // Extract the Comment_ID from the returned object

      await trx('AAR_Comment').insert([
        { AAR_Category_ID: aarCategoryId, Comment_ID: commentSustainId },
        { AAR_Category_ID: aarCategoryId, Comment_ID: commentImproveId },
      ]);
    });

    res.json({ message: 'AAR and comments successfully created' });
  } catch (err) {
    res.status(500).json({ message: `Error occurred while inserting data: ${err.message}` });
  }
});

app.use(router);