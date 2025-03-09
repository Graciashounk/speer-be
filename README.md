# NotesApp

## Overview

NotesApp is a secure and scalable RESTful API that allows users to create, read, update, and delete notes. The application also allows users to share their notes with other users and search for notes based on keywords.

## Technical Choices

### Framework: Express.js
- **Why Express.js?**
  - Lightweight and unopinionated framework allowing flexible architecture
  - Extensive middleware ecosystem for features like rate limiting and authentication
  - Excellent performance and low overhead
  - Large community support and well-maintained packages
  - Easy integration with MongoDB and other tools

### Database: MongoDB
- **Why MongoDB?**
  - Perfect for document-based data like notes with variable content
  - Built-in text search capabilities with text indexes
  - Excellent scalability for high-traffic applications
  - Native support for JSON-like documents
  - Powerful aggregation pipeline for complex queries
  - Easy integration with Node.js through Mongoose

### Key Third-Party Tools

1. **Mongoose**
   - ODM (Object Data Modeling) for MongoDB
   - Provides schema validation and type checking
   - Simplifies database operations with a clean API
   - Supports middleware for pre/post operations

2. **express-rate-limit**
   - Protects API from abuse through rate limiting
   - Configurable time windows and request limits
   - IP-based rate limiting out of the box
   - Currently set to 100 requests per 15 minutes

3. **bcryptjs**
   - Secure password hashing
   - Industry-standard security practices
   - Automatic salt generation and secure comparison

4. **express-session & connect-mongo**
   - Session management for user authentication
   - Persistent sessions stored in MongoDB
   - Secure session handling with configurable options

5. **Swagger/OpenAPI (swagger-jsdoc & swagger-ui-express)**
   - Interactive API documentation
   - Built-in API testing interface
   - Clear endpoint specifications
   - Automatic documentation generation from code comments

6. **Jest & Supertest**
   - Comprehensive testing framework
   - Support for async testing
   - HTTP assertions for API testing
   - Mocking capabilities for unit tests

## Features

- User authentication and authorization
- Create, read, update, and delete notes
- Share notes with other users
- Search for notes based on keywords
- Rate limiting to handle high traffic
- Unit and integration tests

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
   git clone https://github.com/yourusername/notesapp.git
   cd notesapp
   ```

2. Install dependencies: 
   ```bash
   npm install
   npm install --save dotenv-extended 
   npm install express express-session connect-mongo bcrypt mongoose
   npm install swagger-jsdoc swagger-ui-express
   ```

3. Create a .env file in the root directory and add the following environment variables:
   ```
   MONGO_URI=mongodb+srv://speerbackend:Z5ofFGDkMSb@be-test-speer.2mrpr.mongodb.net/?retryWrites=true&w=majority&appName=be-test-speer
   ```

4. Start the application: 
   ```bash
   npm start
   ```

5. Run the tests: 
   ```bash
   npm test
   ```

6. Access Swagger Documentation:
   - Local Development: http://localhost:3000/api-docs
   - Deployed Version: https://speer-be.onrender.com/api-docs

## API Authentication

Most endpoints require API key authentication. To use the Swagger UI:

1. Click the "Authorize" button at the top of the Swagger UI page
2. In the "ApiKeyAuth" section, enter the API key: `your-api-key`
3. Click "Authorize"
4. Close the authorization modal

You can now test any protected endpoint. The API key will be automatically included in your requests.

For direct API calls (outside Swagger), include the header:
```
x-api-key: your-api-key
```

## Deployment

The application is configured to work with Render hosting. The Swagger documentation will automatically use the correct URL in both local development and production environments.
