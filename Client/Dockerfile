# Stage 1: Build the React application
FROM node:latest as build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Install nodemon for development
RUN npm install nodemon -g

# Copy the rest of your app's source code
COPY . .

# Build your app
RUN npm run build

# Stage 2: Serve the React application
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of your app's source code
COPY . .

# Copy the build output from the first stage
COPY --from=build /usr/src/app/build ./build

# Start the app with nodemon
CMD ["npm", "run", "start:dev"]

# Expose port 3000 to the Docker host, so we can access it
# from the outside.
EXPOSE 3000