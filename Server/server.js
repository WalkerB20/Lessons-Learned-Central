import express from 'express';
import cors from 'cors';
import knex from 'knex';
import knexfile from './knexfile.js';
import { config } from 'dotenv';
import getroutes from './Microservices/Get/getroutes.js';
import postroutes from './Microservices/Post/postroutes.js';
import deleteroutes from './Microservices/Delete/deleteroutes.js';
import patchroutes from './Microservices/Patch/patchroutes.js';

config();

// SERVER CONFIGURATION
const app = express();
const PORT = process.env.PORT || 3001;
const db = knex(knexfile[process.env.NODE_ENV || 'development']);

// MIDDLEWARE CONFIGURATION
app.use(cors());
app.use(express.json());
app.use('/api', getroutes(db));
app.use('/api', postroutes(db));
app.use('/api', deleteroutes(db));
app.use('/api', patchroutes(db));

// MAIN SERVER ROUTE
app.get('/api', (req, res) => {
    res.send('Welcome to the application!');
});

app.get('/', (req, res) => {
    res.send('Welcome to the server!');
});

// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`Something broke! Here's what went wrong: ${err.message}`);
});

// PORT Listener
app.listen(PORT, (err) => {
    if (err) {
        console.error(`Error occurred while starting the server: ${err.message}`);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});