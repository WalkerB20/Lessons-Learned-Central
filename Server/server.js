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
            const [sustainCommentId] = await trx('Sustain_Comment').insert({
                Sustain_Comment_Type: 'Sustain',
                Sustain_Comment_Title: formData.sustainTitle,
                Sustain_Comment_Discussion: formData.commentsSustain,
                Sustain_Comment_Recommendation: formData.recommendationsSustain
                // Add other fields as necessary
            }).returning('Sustain_Comment_ID');

            const [improveCommentId] = await trx('Improve_Comment').insert({
                Improve_Comment_Type: 'Improve',
                Improve_Comment_Title: formData.improveTitle,
                Improve_Comment_Discussion: formData.commentsImprove,
                Improve_Comment_Recommendation: formData.recommendationsImprove
                // Add other fields as necessary
            }).returning('Improve_Comment_ID');

            // Insert into the AAR_Comment table
            await trx('AAR_Comment').insert([
                { AAR_Comment_ID: aarId[0], Sustain_Comment_ID: sustainCommentId[0] },
                { AAR_Comment_ID: aarId[0], Improve_Comment_ID: improveCommentId[0] }
            ]);

            // Insert into the Range table and get the inserted ID
            const [rangeId] = await trx('Range').insert({
                Range_Event_Type: formData.eventType,
                Range_Event_Option: formData.additionalOptions,
                Range_Event_Other: formData.additionalInput
                // Add other fields as necessary
            }).returning('Range_ID');

            // Insert into the Deployment table and get the inserted ID
            const [deploymentId] = await trx('Deployment').insert({
                Deployment_Event_Type: formData.eventType,
                Deployment_Event_Option: formData.additionalOptions,
                Deployment_Event_Other: formData.additionalInput
                // Add other fields as necessary
            }).returning('Deployment_ID');

            // Insert into the FTX table and get the inserted ID
            const [ftxId] = await trx('FTX').insert({
                FTX_Event_Type: formData.eventType,
                FTX_Event_Option: formData.additionalOptions,
                FTX_Event_Other: formData.additionalInput
                // Add other fields as necessary
            }).returning('FTX_ID');

            // Insert into the Equipment table and get the inserted ID
            const [equipmentId] = await trx('Equipment').insert({
                Equipment_Event_Type: formData.eventType,
                Equipment_Event_Option: formData.additionalOptions,
                Equipment_Event_Other: formData.additionalInput
                // Add other fields as necessary
            }).returning('Equipment_ID');

            // Insert into the Airborne_Operation table and get the inserted ID
            const [airborneOperationId] = await trx('Airborne_Operation').insert({
                Airborne_Event_Type: formData.eventType,
                Airborne_Event_Option: formData.additionalOptions,
                Airborne_Event_Other: formData.additionalInput
                // Add other fields as necessary
            }).returning('Airborne_Operation_ID');

            // Insert into the Other table and get the inserted ID
            const [otherId] = await trx('Other').insert({
                Other_Event_Type: formData.additionalOptions,
                Other_Event_Option: formData.additionalInput
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