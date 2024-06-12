const foodPurgeLogDao = require('../daos/foodPurgeLogDao');

class FoodPurgeLogService {
  async getAllFoodPurgeLogs() {
    return await foodPurgeLogDao.getAllFoodPurgeLogs();
  }

  async getFoodPurgeLogById(id) {
    return await foodPurgeLogDao.getFoodPurgeLogById(id);
  }

  async createFoodPurgeLog(foodPurgeLogData) {
    return await foodPurgeLogDao.createFoodPurgeLog(foodPurgeLogData);
  }

  async updateFoodPurgeLog(id, foodPurgeLogData) {
    return await foodPurgeLogDao.updateFoodPurgeLog(id, foodPurgeLogData);
  }

  async deleteFoodPurgeLog(id) {
    return await foodPurgeLogDao.deleteFoodPurgeLog(id);
  }
}

module.exports = new FoodPurgeLogService();
