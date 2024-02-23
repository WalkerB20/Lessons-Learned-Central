import express from 'express';
import knex from 'knex';
import knexfile from './knexfile.js';
import { config } from 'dotenv';
import cors from 'cors';

// Load environment variables for .env file
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

// GET FOR EVENTS IN AARCOMPONENTS.JSX
router.get('/events', async (req, res, next) => {
    try {
        // Fetch data from the AAR table
        const aarData = await db.select('*').from('AAR');

        // Fetch data from the Sustain Comment table
        const sustainCommentData = await db.select('*').from('Sustain_Comment', 'Improve_Comment');

        // Fetch data from the Improve Comment table
        const improveCommentData = await db.select('*').from('Improve_Comment');

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
        const airborneOperationData = await db.select('*').from('Airborne');

        // Fetch data from the Other table
        const otherData = await db.select('*').from('Other');

        // Fetch data from the Category table
        const categoryData = await db.select('*').from('Category');

        // Fetch data from the AAR_Category table
        const aarCategoryData = await db.select('*').from('AAR_Category');

        // Send the fetched data as a response
        res.json({
            aarData,
            sustainCommentData,
            improveCommentData,
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

// POST FOR EVENTS IN FORM DATA AARCOMPONENTS.JSX
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
                // Add other fields as necessary
            }).returning('AAR_ID');

            // Insert into the Comment table and get the inserted ID
            const commentIds = await Promise.all(formData.sections.map(async section => {
                const [commentId] = await trx(`${section.type.charAt(0).toUpperCase() + section.type.slice(1)}_Comment`).insert({
                    [`${section.type.charAt(0).toUpperCase() + section.type.slice(1)}_Comment_Type`]: section.type,
                    [`${section.type.charAt(0).toUpperCase() + section.type.slice(1)}_Comment_Title`]: section.title,
                    [`${section.type.charAt(0).toUpperCase() + section.type.slice(1)}_Comment_Discussion`]: section.comments,
                    [`${section.type.charAt(0).toUpperCase() + section.type.slice(1)}_Comment_Recommendation`]: section.recommendations
                    // Add other fields as necessary
                }).returning(`${section.type.charAt(0).toUpperCase() + section.type.slice(1)}_Comment_ID`);

                // Insert into the AAR_Comment table
                await trx('AAR_Comment').insert({
                    AAR_Comment_ID: aarId[0],
                    [`${section.type.charAt(0).toUpperCase() + section.type.slice(1)}_Comment_ID`]: commentId[0]
                });

                return commentId;
            }));

            // Convert eventType to match database table naming convention
            const formattedEventType = formData.eventType.replace(/([a-z])([A-Z])/g, '$1_$2');
            const dbEventType = formattedEventType.charAt(0).toUpperCase() + formattedEventType.slice(1);

            // Insert into the specific event table and get the inserted ID
            const [eventId] = await trx(dbEventType).insert({
                [`${dbEventType}_Event_Type`]: formData.eventType,
                [`${dbEventType}_Event_Option`]: formData.additionalOptions,
                [`${dbEventType}_Event_Other`]: formData.additionalInput
                // Add other fields as necessary
            }).returning(`${dbEventType}_ID`);

            // Insert into the Category table and get the inserted ID
            const [categoryId] = await trx('Category').insert({
                [`${dbEventType}_ID`]: eventId[0]
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