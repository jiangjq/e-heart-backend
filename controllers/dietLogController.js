const dietLogService = require('../services/dietLogService');

class DietLogController {
  async getAllDietLogs(req, res) {
    try {
      const dietLogs = await dietLogService.getAllDietLogs();
      res.json(dietLogs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getDietLogById(req, res) {
    try {
      const dietLog = await dietLogService.getDietLogById(req.params.id);
      if (dietLog) {
        res.json(dietLog);
      } else {
        res.status(404).json({ error: 'Diet Log not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createDietLog(req, res) {
    try {
      const dietLog = await dietLogService.createDietLog(req.body);
      res.status(201).json(dietLog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateDietLog(req, res) {
    try {
      const dietLog = await dietLogService.updateDietLog(req.params.id, req.body);
      res.json(dietLog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteDietLog(req, res) {
    try {
      await dietLogService.deleteDietLog(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new DietLogController();
