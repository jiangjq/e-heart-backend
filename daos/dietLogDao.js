const { DietLog } = require('../models');

class DietLogDao {
  async getAllDietLogs() {
    return await DietLog.findAll();
  }

  async getDietLogById(id) {
    return await DietLog.findByPk(id);
  }

  async createDietLog(dietLogData) {
    return await DietLog.create(dietLogData);
  }

  async updateDietLog(id, dietLogData) {
    const [updated] = await DietLog.update(dietLogData, {
      where: { id: id }
    });
    if (updated) {
      return await DietLog.findByPk(id);
    }
    throw new Error('Diet Log not found');
  }

  async deleteDietLog(id) {
    const deleted = await DietLog.destroy({
      where: { id: id }
    });
    if (!deleted) {
      throw new Error('Diet Log not found');
    }
    return deleted;
  }
}

module.exports = new DietLogDao();
