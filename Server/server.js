import express from 'express';
import knex from 'knex';
import knexfile from './knexfile.js';

// Server Configurationq
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
app.get("/llc", async (req, res) => {
    res.send("Welcome to the LLC Database!");
    const llc = await db.select().from('llc');
    res.json(llc);
});

// PORT Listener
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});