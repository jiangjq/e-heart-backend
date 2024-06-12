const dietLogDao = require('../daos/dietLogDao');

class DietLogService {
  async getAllDietLogs() {
    return await dietLogDao.getAllDietLogs();
  }

  async getDietLogById(id) {
    return await dietLogDao.getDietLogById(id);
  }

  async createDietLog(dietLogData) {
    return await dietLogDao.createDietLog(dietLogData);
  }

  async updateDietLog(id, dietLogData) {
    return await dietLogDao.updateDietLog(id, dietLogData);
  }

  async deleteDietLog(id) {
    return await dietLogDao.deleteDietLog(id);
  }
}

module.exports = new DietLogService();
