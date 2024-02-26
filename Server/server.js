import express from 'express';
import cors from 'cors';
import knex from 'knex';
import knexfile from './knexfile.js';
import { config } from 'dotenv';
import getroutes from './Microservices/Get/getroutes.js';
import postroutes from './Microservices/Post/postroutes.js';
import deleteroutes from './Microservices/Delete/deleteroutes.js';
import patchroutes from './Microservices/Patch/patchroutes.js';
import { jwt } from 'express-jwt';
import { jwksRsa } from 'jwks-rsa';

// Load environment variables for .env file
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
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
  
    audience: `${REACT_APP_AUTH0_CLIENT_ID}`,
    issuer: `https://${REACT_APP_AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
  });

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

app.post('/api/like', checkJwt, async (req, res) => {
    const { postId } = req.body;
    const userId = req.auth.sub; // The user ID is typically found in the 'sub' claim of the decoded JWT
  
    try {
      // Check if the like already exists
      const existingLike = await Like.findOne({ where: { postId, userId } });
      if (existingLike) {
        return res.status(409).json({ message: 'User has already liked this post.' });
      }
  
      // Record the new like
      const newLike = await Like.create({ postId, userId });
      res.json({ message: 'Like added successfully.', likeId: newLike.id });
    } catch (error) {
      console.error('Failed to like post:', error);
      res.status(500).json({ message: 'Server error while liking the post.' });
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