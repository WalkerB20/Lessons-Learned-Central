# Stage 1: Build the React application
FROM node:latest as build

# Set the working directory in the container
WORKDIR /usr/src

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of your app's source code
COPY . .

# Build your app
RUN npm run build

# Install serve to run the application
RUN npm install -g serve

# Expose port 3000 to the Docker host, so we can access it
# from the outside.
EXPOSE 3000

# Define environment variable
ENV NODE_ENV production

# Run serve when the container launches
CMD ["serve", "-s", "build", "-l", "3000"]
