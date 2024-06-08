const { FoodPurgeLog } = require('../models');

class FoodPurgeLogDao {
  async getAllFoodPurgeLogs() {
    return await FoodPurgeLog.findAll();
  }

  async getFoodPurgeLogById(id) {
    return await FoodPurgeLog.findByPk(id);
  }

  async createFoodPurgeLog(foodPurgeLogData) {
    return await FoodPurgeLog.create(foodPurgeLogData);
  }

  async updateFoodPurgeLog(id, foodPurgeLogData) {
    const [updated] = await FoodPurgeLog.update(foodPurgeLogData, {
      where: { id: id }
    });
    if (updated) {
      return await FoodPurgeLog.findByPk(id);
    }
    throw new Error('Food Purge Log not found');
  }

  async deleteFoodPurgeLog(id) {
    const deleted = await FoodPurgeLog.destroy({
      where: { id: id }
    });
    if (!deleted) {
      throw new Error('Food Purge Log not found');
    }
    return deleted;
  }
}

module.exports = new FoodPurgeLogDao();
