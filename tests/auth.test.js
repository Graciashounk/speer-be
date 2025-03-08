const request = require('supertest');
const app = require('../app');
const User = require('../models/user');

describe('Auth API', () => {
  beforeAll(async () => {
    await User.deleteMany({});
  }, 10000);

  test('Should create a new user', async () => {
    const response = await request(app).post('/api/auth/signup').send({
      email: 'testuser@example.com',
      password: 'testpassword'
    });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User created successfully');
  });

  test('Should login an existing user', async () => {
    // Create a user first
    await request(app).post('/api/auth/signup').send({
      email: 'testuser@example.com',
      password: 'testpassword'
    });

    // Attempt to log in with the created user
    const response = await request(app).post('/api/auth/login').send({
      email: 'testuser@example.com',
      password: 'testpassword'
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Logged in successfully');
  });
});