const UserService = require('../../services/userService');
const UserDao = require('../../daos/userDao');

// Mock the User DAO
jest.mock('../../daos/userDao');

describe('UserService', () => {
  const userData = {
    id: 1,
    name: 'Test User',
    email: 'test.user@example.com',
    password: 'password123',
    phone_number: '1234567890',
  };

  it('should create a new user', async () => {
    UserDao.createUser.mockResolvedValue(userData);
    const user = await UserService.createUser(userData);
    expect(user).toEqual(userData);
  });

  it('should get all users', async () => {
    UserDao.getAllUsers.mockResolvedValue([userData]);
    const users = await UserService.getAllUsers();
    expect(users).toEqual([userData]);
  });

  it('should get a user by ID', async () => {
    UserDao.getUserById.mockResolvedValue(userData);
    const user = await UserService.getUserById(1);
    expect(user).toEqual(userData);
  });

  it('should update a user', async () => {
    UserDao.updateUser.mockResolvedValue({ ...userData, name: 'Updated User' });
    const user = await UserService.updateUser(1, { name: 'Updated User' });
    expect(user.name).toEqual('Updated User');
  });

  it('should delete a user', async () => {
    UserDao.deleteUser.mockResolvedValue(true);
    const result = await UserService.deleteUser(1);
    expect(result).toBe(true);
  });
});
