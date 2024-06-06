const ImpulseRecord = require('../models/impulseRecord');
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

module.exports = ImpulseRecordDao;