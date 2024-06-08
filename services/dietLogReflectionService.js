const dietLogReflectionDao = require('../daos/dietLogReflectionDao');

class DietLogReflectionService {
  async getAllDietLogReflections() {
    return await dietLogReflectionDao.getAllDietLogReflections();
  }

  async getDietLogReflectionById(id) {
    return await dietLogReflectionDao.getDietLogReflectionById(id);
  }

  async createDietLogReflection(dietLogReflectionData) {
    return await dietLogReflectionDao.createDietLogReflection(dietLogReflectionData);
  }

  async updateDietLogReflection(id, dietLogReflectionData) {
    return await dietLogReflectionDao.updateDietLogReflection(id, dietLogReflectionData);
  }

  async deleteDietLogReflection(id) {
    return await dietLogReflectionDao.deleteDietLogReflection(id);
  }
}

module.exports = new DietLogReflectionService();
