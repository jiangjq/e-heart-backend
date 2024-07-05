const { ImpulseRecord, ImpulseRecordReflection, ImpulseStrategy } = require('../models/impulse');
const { Sequelize } = require('sequelize');

class ImpulseRecordDao {

  async addImpulseRecord(record) {
    const { user_id, impulse_type, time, date, intensity, trigger, plan} = record;
    try {
      const newImpulseRecord = await ImpulseRecord.create({
        user_id,
        impulse_type,
        time,
        date,
        intensity,
        trigger,
        plan,
      });
      return newImpulseRecord;
    } catch (error) {
      console.error(`Error adding impulse strategy for user_id ${user_id}:`, error);
      throw error;
    }
  }

  async getAllImpulseRecordByUid(user_id) {
      return ImpulseRecord.findAll(
        {
          where: {
            user_id: user_id,
          },
        }
      )
  }

// Method to update impulse_response_experience by id
async updateImpulseResponseExperience(id, newExperience) {
  try {
    await ImpulseRecord.update(
      { impulse_response_experience: newExperience },
      { where: { id } }
    );
  } catch (error) {
    console.error(`Error updating impulse_response_experience for id ${id}:`, error);
    throw error;
  }
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

  async addImpulseRecordReflection(user_id, number) {
    const newReflection = ImpulseRecordReflection.create({
      user_id: user_id,
      impulse_record_reflection_num: number,
    });
    return newReflection;
  }

  async updateImpulseRecordReflection(reflection, reflection_id) {
    try {
      const [updated] = await ImpulseRecordReflection.update(
        reflection,
        { where: { 
          id : reflection_id,
        } }
      );
      if (!updated) {
        throw new Error(`ImpulseRecordReflection with id ${reflection_id}, was not found or no changes were made.`);
      }
    } catch (error) {
      console.error(`Error updating impulse record reflection for id ${reflection_id}:`, error);
      throw error;
    }
  }

  async getRecordsRelatedToReflection(reflectionId) {
      const reflection = await ImpulseRecordReflection.findByPk(reflectionId, {
        include: ImpulseRecord
      });
      return reflection.ImpulseRecords
  }

  async updateLatestImpulseRecordReflection(reflection) {

    const id = getNewestReflectionIdForUser(reflection.user_id);
    try {
      const [updated] = await ImpulseRecordReflection.update(
        reflection,
        { where: { id } }
      );
      if (!updated) {
        throw new Error(`ImpulseRecordReflection with id ${id} was not found or no changes were made.`);
      }
    } catch (error) {
      console.error(`Error updating impulse record reflection for id ${id}:`, error);
      throw error;
    }
  }

  async getNewestReflectionForUser(userId) {
    try {
      const newestReflection = await ImpulseRecordReflection.findOne({
        where: {
          user_id: userId
        },
        order: [['impulse_record_reflection_num', 'DESC']],
        limit: 1
      });
  
      if (newestReflection) {
        return newestReflection;
      } else {
        return null; // or throw an error or handle the case where no records are found
      }
    } catch (error) {
      console.error('Error fetching the newest reflection ID for user:', error);
      throw error;
    }
  }

  async getAllImpulseRecordReflection(user_id) {
    try {
      const reflections = await ImpulseRecordReflection.findAll({
        where: {
          user_id: user_id,
        },
        order: [['reflection_date', 'DESC']],
      });
      return reflections;
    } catch (error) {
      console.error('Error fetching impulse reflections for user_id ${user_id}:', error);
    }
  }

  async getLatestImpulseRecordReflectionByUid(user_id) {
      return ImpulseRecordReflection.findOne({
          where: { user_id: user_id },
          order: [['reflection_date', 'DESC']],
        });
  }
}

class ImpulseStrategyDao {

  async addImpulseStrategy({ user_id, custom_activity, details, activity_order }) {
    try {
      const newStrategy = await ImpulseStrategy.create({
        user_id,
        custom_activity,
        details,
        activity_order,
      });
      console.log('ImpulseStrategy added successfully:', newStrategy);
      return newStrategy;
    } catch (error) {
      console.error(`Error adding impulse strategy for user_id ${user_id}:`, error);
      throw error;
    }
  }
  

  async getImpulseStrategiesByUserId(userId) {
    try {
      const strategies = await ImpulseStrategy.findAll({
        where: {
          user_id: userId,
        },
        order: [['activity_order', 'ASC']],
      });
      return strategies;
    } catch (error) {
      console.error('Error fetching impulse strategies for user_id ${userId}:', error);
    }
  }
}

module.exports =  {
  ImpulseRecordDao,
  ImpulseRecordReflectionDao,
  ImpulseStrategyDao,
}