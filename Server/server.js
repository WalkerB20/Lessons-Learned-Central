import express from 'express';
import knex from 'knex';
import knexfile from './knexfile.js';
import { config } from 'dotenv';
config();

// SERVER CONFIGURATION
const app = express();
const PORT = process.env.PORT || 3001;
const db = knex(knexfile[process.env.NODE_ENV || 'development']);

// MIDDLEWARE
app.use(express.json());

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
app.get("/AAR", async (req, res, next) => {
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

