const { DietLogReflection } = require('../models');

class DietLogReflectionDao {
  async getAllDietLogReflections() {
    return await DietLogReflection.findAll();
  }

  async getDietLogReflectionById(id) {
    return await DietLogReflection.findByPk(id);
  }

  async createDietLogReflection(dietLogReflectionData) {
    return await DietLogReflection.create(dietLogReflectionData);
  }

  async updateDietLogReflection(id, dietLogReflectionData) {
    const [updated] = await DietLogReflection.update(dietLogReflectionData, {
      where: { id: id }
    });
    if (updated) {
      return await DietLogReflection.findByPk(id);
    }
    throw new Error('Diet Log Reflection not found');
  }

  async deleteDietLogReflection(id) {
    const deleted = await DietLogReflection.destroy({
      where: { id: id }
    });
    if (!deleted) {
      throw new Error('Diet Log Reflection not found');
    }
    return deleted;
  }
}

module.exports = new DietLogReflectionDao();
