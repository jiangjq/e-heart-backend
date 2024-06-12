const { ImpulseRecord, ImpulseRecordReflection } = require('../models/impulse');
const { Sequelize } = require('sequelize');

class ImpulseRecordDao {
    async getAllImpulseRecord() {
        return ImpulseRecord.findAll()
    }
    async getImpulseRecordById(id) {
        return ImpulseRecord.findByPk(id)
    }

    // get record by id and date in [sinceDate, now]
    async getRecordsByIdAndSinceDate(user_id, sinceDate) {
        return ImpulseRecord.findAll({
            where: {
              user_id: user_id,
              date: {
                [Sequelize.Op.gte]: sinceDate // Sequelize.Op.gte means 'greater than or equal to'
              }
            }
          });
    }
}

class ImpulseRecordReflectionDao {

  async getLatestImpulseRecordReflectionById(user_id) {
      return ImpulseRecordReflection.findOne({
          where: { user_id: user_id },
          order: [['reflection_date', 'DESC']],
        });
  }
}

module.exports =  {
  ImpulseRecordDao,
  ImpulseRecordReflectionDao
}