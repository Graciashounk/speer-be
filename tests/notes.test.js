const request = require('supertest');
const app = require('../app');
const User = require('../models/user');
const Note = require('../models/note');

// Define the API key for authentication
const apiKey = 'your-api-key';

beforeAll(async () => {
  // Clear the User and Note collections before running the tests
  await User.deleteMany({});
  await Note.deleteMany({});
  
  // Create a new user for testing
  await request(app).post('/api/auth/signup').send({
    email: 'testuser@example.com',
    password: 'testpassword'
  });
  
  // Log in the created user to generate a session
  await request(app).post('/api/auth/login').send({
    email: 'testuser@example.com',
    password: 'testpassword'
  });
});

describe('Notes API', () => {
  test('Should create a new note', async () => {
    // Send a POST request to create a new note
    const response = await request(app)
      .post('/api/notes')
      .set('x-api-key', apiKey) // Set the API key for authentication
      .send({ title: 'Test Note', content: 'This is a test note' });
    
    // Check that the response status is 201 Created
    expect(response.status).toBe(201);
  });

  test('Should get all notes', async () => {
    // Send a GET request to retrieve all notes
    const response = await request(app)
      .get('/api/notes')
      .set('x-api-key', apiKey); // Set the API key for authentication
    
    // Check that the response status is 200 OK
    expect(response.status).toBe(200);
  });

  test('Should update a note', async () => {
    // Find all notes in the database
    const notes = await Note.find({});
    
    // Send a PUT request to update the first note
    const response = await request(app)
      .put(`/api/notes/${notes[0]._id}`)
      .set('x-api-key', apiKey) // Set the API key for authentication
      .send({ title: 'Updated Note', content: 'Updated content' });
    
    // Check that the response status is 200 OK
    expect(response.status).toBe(200);
  });

  test('Should delete a note', async () => {
    // Find all notes in the database
    const notes = await Note.find({});
    
    // Send a DELETE request to delete the first note
    const response = await request(app)
      .delete(`/api/notes/${notes[0]._id}`)
      .set('x-api-key', apiKey); // Set the API key for authentication
    
    // Check that the response status is 204 No Content
    expect(response.status).toBe(204);
  });
});