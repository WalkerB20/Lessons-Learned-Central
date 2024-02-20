# Use the official Node.js 16 as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/server

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install any dependencies
RUN npm install

# Bundle app source
COPY . .

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3001

# Define the command to run your app using CMD which defines your runtime
CMD [ "node", "server.js" ]
