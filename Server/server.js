import express from 'express';
import knex from 'knex';
import { knexfile } from './knexfile.js';
import { config } from 'dotenv';
config();

// Server Configuration
const app = express();
const PORT = process.env.PORT || 3001;
const db = knex(knexfile[process.env.NODE_ENV || 'development']);

// Middleware
app.use(express.json());

// Server Routes
app.get("/", (req, res) => {
    res.send("Welcome to the Server!");
});

// Server Route to get database
app.get("/AAR", async (req, res) => {
    const aar = await db.select().from('AAR');
    res.json(aar);
});

// PORT Listener
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});