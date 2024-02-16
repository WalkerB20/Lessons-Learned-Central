const express = require('express');
const cors = require('cors');
const knex = require('knex');
const app = express();

// Enable CORS
app.use(cors());

// Create a PostgreSQL connection
const db = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'password',
        database: 'mydatabase'
    }
});

// Define your routes here

// Start the server
const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
