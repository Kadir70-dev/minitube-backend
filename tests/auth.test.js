const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('Auth API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase(); // Clean up
    await mongoose.connection.close();

  });

  it('should signup a new user', async () => {
    const res = await request(app).post('/api/auth/signup').send({
      username: 'testuser' + Date.now(), // Make unique
      email: `testuser${Date.now()}@example.com`, // Make unique
      password: 'test1234'
      
    });

    console.log(res.body); // Debug any errors

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    
  });
});
