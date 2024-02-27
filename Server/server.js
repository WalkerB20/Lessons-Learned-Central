import express from 'express';
import cors from 'cors';
import knex from 'knex';
import knexfile from './knexfile.js';
import { config } from 'dotenv';
import getroutes from './Microservices/Get/getroutes.js';
import postroutes from './Microservices/Post/postroutes.js';
import deleteroutes from './Microservices/Delete/deleteroutes.js';
import patchroutes from './Microservices/Patch/patchroutes.js';
import { expressjwt as jwt } from 'express-jwt';
import jwksRsa from 'jwks-rsa';

config();

// SERVER CONFIGURATION
const app = express();
const PORT = process.env.PORT || 3001;
const db = knex(knexfile[process.env.NODE_ENV || 'development']);

// MIDDLEWARE CONFIGURATION
app.use(cors());
app.use(express.json());
// Authentication middleware
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    issuer: `${process.env.REACT_APP_AUTH0_DOMAIN}`,
    audience: `${process.env.REACT_APP_AUTH0_AUDIENCE}`,
    algorithms: ['RS256']
  });

  // Use the middleware in routes
  app.use(checkJwt);

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
        const userId = req.user.sub; // Assuming JWT middleware adds user info to req.user
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

export { logUserAction, checkJwt };