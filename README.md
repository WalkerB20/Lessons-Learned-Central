# Lessons Learned Central Application

## Overview

This application is designed to facilitate the After Action Review (AAR) process. It allows users to record, analyze, and share lessons learned from both training and real-world operations.

## Features

- **Record AARs**: Users can easily input data from AARs, including key events, observations, and lessons learned.

- **Share Lessons**: Users can share lessons learned with others, promoting a culture of continuous learning and improvement.

- **Search**: Users can search the database for AARs specific to their upcoming operations or activities, and implement best practices based on their results.

## Start Up:

1. Start Docker (Docker must be running for this application to work on a local machine).
2. Make a folder to house this repository, and clone the repository to that folder.
3. Use a terminal to cd into the folder that has the repository.
4. Type docker-compose up
5. Navigate to http://localhost:3000 in a browser.
6. To close the program, type docker-compose down.
7. If you want to save space on your computer:
	1. Use docker-compose down --rmi all -v to remove all images and volumes.
	2. Use docker system prune -a --volumes to also clear your builds and cache.
8. If you want to deploy this application for remote users, Auth0 login functionality is on board. You will just need to create an Auth0 account and follow the instrucitons. You'll need to create a .env file in the root folder with your Auth0 credentials.