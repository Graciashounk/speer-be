# NotesApp

## Overview

NotesApp is a secure and scalable RESTful API that allows users to create, read, update, and delete notes. The application also allows users to share their notes with other users and search for notes based on keywords.

## Features

- User authentication and authorization
- Create, read, update, and delete notes
- Share notes with other users
- Search for notes based on keywords
- Rate limiting to handle high traffic
- Unit and integration tests

## Technologies Used

- Express.js
- MongoDB
- Mongoose
- bcrypt.js
- express-rate-limit
- Jest
- Supertest


## API Endpoints

Authentication
POST /api/auth/signup: Create a new user account

POST /api/auth/login: Log in to an existing user account and receive an access token

Notes
GET /api/notes: Get a list of all notes for the authenticated user

GET /api/notes/:id: Get a note by ID for the authenticated user

POST /api/notes: Create a new note for the authenticated user

PUT /api/notes/:id: Update an existing note by ID for the authenticated user

DELETE /api/notes/:id: Delete a note by ID for the authenticated user

POST /api/notes/:id/share: Share a note with another user

GET /api/search?q=:query: Search for notes based on keywords

GET /users: Get list of users

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Graciashounk/speer-be.git
   cd speer-be

2. Install dependencies: 
-npm install
-npm install --save dotenv-extended 
-npm install express express-session connect-mongo bcrypt mongoose
-npm install swagger-jsdoc swagger-ui-express


3. Create a .env file in the root directory and add the following environment variables:

MONGO_URI=mongodb+srv://speerbackend:Z5ofFGDkMSb@be-test-speer.2mrpr.mongodb.net/?retryWrites=true&w=majority&appName=be-test-speer


4. Start the application: npm start

5. Run the tests: npm test

6. Swagger GUI http://localhost:3000/api-docs
