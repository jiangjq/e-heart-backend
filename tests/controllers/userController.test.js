const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const UserService = require('../../services/userService');
const userRoutes = require('../../routes/userRoutes');
const app = express();

app.use(bodyParser.json());
app.use('/api/users', userRoutes);

// Mock the UserService
jest.mock('../../services/userService');

describe('UserController', () => {
  const userData = {
    id: 1,
    name: 'Test User',
    email: 'test.user@example.com',
    password: 'password123',
    phone_number: '1234567890',
  };

  it('should create a new user', async () => {
    UserService.createUser.mockResolvedValue(userData);
    const res = await request(app)
      .post('/api/users')
      .send(userData);
    expect(res.status).toBe(201);
    expect(res.body).toEqual(userData);
  });

  it('should get all users', async () => {
    UserService.getAllUsers.mockResolvedValue([userData]);
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([userData]);
  });

  it('should get a user by ID', async () => {
    UserService.getUserById.mockResolvedValue(userData);
    const res = await request(app).get('/api/users/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(userData);
  });

  it('should update a user', async () => {
    UserService.updateUser.mockResolvedValue({ ...userData, name: 'Updated User' });
    const res = await request(app)
      .put('/api/users/1')
      .send({ name: 'Updated User' });
    expect(res.status).toBe(200);
    expect(res.body.name).toEqual('Updated User');
  });

  it('should delete a user', async () => {
    UserService.deleteUser.mockResolvedValue(true);
    const res = await request(app).delete('/api/users/1');
    expect(res.status).toBe(204);
  });
});
