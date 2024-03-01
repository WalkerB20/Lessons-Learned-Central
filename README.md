# Lessons Learned Central Application

## Overview
The Lessons Learned Central Application simplifies the After Action Review (AAR) process. It assists users in documenting, analyzing, and sharing insights from both training sessions and real-world operations.

## Features
### Record AARs
Easily input data from AARs, including important events, observations, and lessons learned.

### Share Lessons
Promote continuous learning and improvement by sharing lessons learned with others.

### Search
Quickly find relevant AARs for upcoming operations or activities, allowing users to implement best practices effectively.

## Getting Started
1. **Start Docker**: Ensure Docker is running on your local machine.
2. **Setup Repository**:
   - Create a folder to house this repository.
   - Clone the repository to that folder.
3. **Run the Application**:
   - Use the terminal to navigate (`cd`) into the repository folder.
   - Type `docker-compose up`.
4. **Access the Application**:
   - Open a web browser and go to [http://localhost:3000](http://localhost:3000).
5. **Shut Down**:
   - To close the program, type `docker-compose down`.
6. **Optional: Free up Space**:
   - Remove all images and volumes: `docker-compose down --rmi all -v`.
   - Clear builds and cache: `docker system prune -a --volumes`.

## Deployment for Remote Users
If you want to deploy this application for remote users:
- Utilize Auth0 login functionality.
- Create an Auth0 account and follow the instructions.
- Create a `.env` file in the root folder with your Auth0 credentials.

---
This README provides simple steps to navigate and utilize the Lessons Learned Central Application effectively.
