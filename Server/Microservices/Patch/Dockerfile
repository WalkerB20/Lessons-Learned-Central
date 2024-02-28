# Use the official Node.js 16 as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/patchroutes

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install any dependencies
RUN npm install

# Install nodemon for development
RUN npm install -g nodemon

# Bundle app source
COPY . .

# Your app binds to port 3001 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3005

# Define the command to run your app using CMD which defines your runtime
CMD [ "nodemon", "patchroutes.js" ]
