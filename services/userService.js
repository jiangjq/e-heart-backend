const userDao = require('../daos/userDao');

class UserService {
  async getAllUsers() {
    return await userDao.getAllUsers();
  }

  async getUserById(id) {
    return await userDao.getUserById(id);
  }

  async createUser(userData) {
    return await userDao.createUser(userData);
  }

  async updateUser(id, userData) {
    return await userDao.updateUser(id, userData);
  }

  async deleteUser(id) {
    return await userDao.deleteUser(id);
  }
}

module.exports = new UserService();
