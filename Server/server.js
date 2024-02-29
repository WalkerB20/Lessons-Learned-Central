import express from 'express';
import cors from 'cors';
import knex from 'knex';
import knexfile from './knexfile.js';
import { config } from 'dotenv';
import getroutes from './Microservices/Get/getroutes.js';
import postroutes from './Microservices/Post/postroutes.js';
import deleteroutes from './Microservices/Delete/deleteroutes.js';
import patchroutes from './Microservices/Patch/patchroutes.js';
import { auth } from 'express-oauth2-jwt-bearer';

config();

// SERVER CONFIGURATION
const app = express();
const PORT = process.env.PORT || 3001;
const db = knex(knexfile[process.env.NODE_ENV || 'development']);

// MIDDLEWARE CONFIGURATION
app.use(cors());
app.use(express.json());
// Authentication middleware
const jwtCheck = auth({
  audience: 'http://localhost:3001/api',
  issuerBaseURL: 'https://dev-0kr4m17yxuqi4yv8.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

  // Use the middleware in routes
  app.use(jwtCheck);

  app.use((req, res, next) => {
    console.log(req.user);
    next();
  });

app.use('/api', getroutes(db));
app.use('/api', postroutes(db));
app.use('/api', deleteroutes(db));
app.use('/api', patchroutes(db));


// Middleware to log user actions
function logUserAction(actionType) {
    return async (req, res, next) => {
      try {
        const userId = req.data.sub // Assuming JWT middleware adds user info to req.user
        const postId = req.params.postId || null; // Adapt based on your route structure
        const likeId = req.params.likeId || null; // Adapt based on your route structure
        
        await db('UserActions').insert({
          User_ID: userId,
          Post_ID: postId,
          Like_ID: likeId,
          Action_Type: actionType,
        });
        
        next();
      } catch (error) {
        console.error('Failed to log user action:', error);
        next();
      }
    };
  }
  

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

export { logUserAction, jwtCheck };