const foodPurgeLogService = require('../services/foodPurgeLogService');

class FoodPurgeLogController {
  async getAllFoodPurgeLogs(req, res) {
    try {
      const foodPurgeLogs = await foodPurgeLogService.getAllFoodPurgeLogs();
      res.json(foodPurgeLogs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getFoodPurgeLogById(req, res) {
    try {
      const foodPurgeLog = await foodPurgeLogService.getFoodPurgeLogById(req.params.id);
      if (foodPurgeLog) {
        res.json(foodPurgeLog);
      } else {
        res.status(404).json({ error: 'Food Purge Log not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createFoodPurgeLog(req, res) {
    try {
      const foodPurgeLog = await foodPurgeLogService.createFoodPurgeLog(req.body);
      res.status(201).json(foodPurgeLog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateFoodPurgeLog(req, res) {
    try {
      const foodPurgeLog = await foodPurgeLogService.updateFoodPurgeLog(req.params.id, req.body);
      res.json(foodPurgeLog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteFoodPurgeLog(req, res) {
    try {
      await foodPurgeLogService.deleteFoodPurgeLog(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new FoodPurgeLogController();
