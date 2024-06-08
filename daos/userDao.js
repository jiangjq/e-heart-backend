const { User } = require('../models');

class UserDao {
  async getAllUsers() {
    return await User.findAll();
  }

  async getUserById(id) {
    return await User.findByPk(id);
  }

  async createUser(userData) {
    return await User.create(userData);
  }

  async updateUser(id, userData) {
    const [updated] = await User.update(userData, {
      where: { id: id }
    });
    if (updated) {
      return await User.findByPk(id);
    }
    throw new Error('User not found');
  }

  async deleteUser(id) {
    const deleted = await User.destroy({
      where: { id: id }
    });
    if (!deleted) {
      throw new Error('User not found');
    }
    return deleted;
  }
}

module.exports = new UserDao();
