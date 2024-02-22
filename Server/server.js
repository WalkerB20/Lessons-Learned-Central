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
app.get("/events", (req, res, next) => {
    try {
        res.send("Welcome to the AAR route!");
    } catch (err) {
        next({ message: 'Error occurred while handling /test route', originalError: err });
    }
});

router.get('/events', async (req, res, next) => {
    try {
        // Fetch data from the AAR table
        const aarData = await db.select('*').from('AAR');

        // Fetch data from the Comment table
        const commentData = await db.select('*').from('Comment');

        // Fetch data from the AAR_Comment table
        const aarCommentData = await db.select('*').from('AAR_Comment');

        // Fetch data from the Range table
        const rangeData = await db.select('*').from('Range');

        // Fetch data from the Deployment table
        const deploymentData = await db.select('*').from('Deployment');

        // Fetch data from the FTX table
        const ftxData = await db.select('*').from('FTX');

        // Fetch data from the Equipment table
        const equipmentData = await db.select('*').from('Equipment');

        // Fetch data from the Airborne_Operation table
        const airborneOperationData = await db.select('*').from('Airborne_Operation');

        // Fetch data from the Other table
        const otherData = await db.select('*').from('Other');

        // Fetch data from the Category table
        const categoryData = await db.select('*').from('Category');

        // Fetch data from the AAR_Category table
        const aarCategoryData = await db.select('*').from('AAR_Category');

        // Send the fetched data as a response
        res.json({
            aarData,
            commentData,
            aarCommentData,
            rangeData,
            deploymentData,
            ftxData,
            equipmentData,
            airborneOperationData,
            otherData,
            categoryData,
            aarCategoryData
        });
    } catch (err) {
        next({ message: 'Error occurred while fetching data', originalError: err });
    }
});

router.post('/events', async (req, res, next) => {
    const formData = req.body;
    try {
        // Start a transaction
        await db.transaction(async trx => {
            // Insert into the AAR table and get the inserted ID
            const [aarId] = await trx('AAR').insert({
                AAR_Name: formData.eventTitle,
                AAR_Location: formData.eventLocation,
                AAR_Activity_Date: formData.eventDate,
                AAR_Location: formData.eventLocation
                // Add other fields as necessary
            }).returning('AAR_ID');

            // Insert into the Comment table and get the inserted ID
            const [sustainCommentId] = await trx('Comment').insert({
                Comment_Title: formData.sustainTitle,
                Comment_Discussion: formData.commentsSustain,
                Comment_Recommendation: formData.recommendationsSustain
                // Add other fields as necessary
            }).returning('Comment_ID');

            const [improveCommentId] = await trx('Comment').insert({
                Comment_Title: formData.improveTitle,
                Comment_Discussion: formData.commentsImprove,
                Comment_Recommendation: formData.recommendationsImprove
                // Add other fields as necessary
            }).returning('Comment_ID');

            // Insert into the AAR_Comment table
            await trx('AAR_Comment').insert([
                { AAR_Comment_ID: aarId[0], Comment_ID: sustainCommentId[0] },
                { AAR_Comment_ID: aarId[0], Comment_ID: improveCommentId[0] }
            ]);

            // Insert into the Range table and get the inserted ID
            const [rangeId] = await trx('Range').insert({
                Event_Type: formData.eventType
                // Add other fields as necessary
            }).returning('Range_ID');

            // Insert into the Deployment table and get the inserted ID
            const [deploymentId] = await trx('Deployment').insert({
                Event_Type: formData.eventType,
                // Add other fields as necessary
            }).returning('Deployment_ID');

            // Insert into the FTX table and get the inserted ID
            const [ftxId] = await trx('FTX').insert({
                Event_Type: formData.eventType
                // Add other fields as necessary
            }).returning('FTX_ID');

            // Insert into the Equipment table and get the inserted ID
            const [equipmentId] = await trx('Equipment').insert({
                Event_Type: formData.eventType
                // Add other fields as necessary
            }).returning('Equipment_ID');

            // Insert into the Airborne_Operation table and get the inserted ID
            const [airborneOperationId] = await trx('Airborne_Operation').insert({
                Event_Type: formData.eventType
                // Add other fields as necessary
            }).returning('Airborne_Operation_ID');

            // Insert into the Other table and get the inserted ID
            const [otherId] = await trx('Other').insert({
                Event_Type: formData.additionalOptions
                // Add fields as necessary
            }).returning('Other_ID');

            // Insert into the Category table and get the inserted ID
            const [categoryId] = await trx('Category').insert({
                Range_ID: rangeId[0],
                Deployment_ID: deploymentId[0],
                FTX_ID: ftxId[0],
                Equipment_ID: equipmentId[0],
                Airborne_Operation_ID: airborneOperationId[0],
                Other_ID: otherId[0]
                // Add other fields as necessary
            }).returning('Category_ID');

            // Insert into the AAR_Category table
            await trx('AAR_Category').insert({
                AAR_ID: aarId[0],
                Category_ID: categoryId[0]
            });

            // Repeat the above steps for other tables as necessary
        });

        res.json({ success: true, message: 'Data inserted successfully' });
    } catch (err) {
        next({ message: 'Error occurred while inserting data', originalError: err });
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