const { ImpulseStrategyDao, ImpulseRecordDao, ImpulseRecordReflectionDao } = require('../daos/impulseDao');
const impulseRecordReflectionDao = new ImpulseRecordReflectionDao()
const impulseRecordDao = new ImpulseRecordDao()
class ImpulseService {

    async addImpulseRecord(record) {
        const newRecord = await impulseRecordDao.addImpulseRecord(record);
        const current_reflection = await this.#getOrCreateCurrentImpulseRecordReflection(record.user_id);
        return await newRecord.addImpulseRecordReflection(current_reflection)
    }

    async #getOrCreateCurrentImpulseRecordReflection(user_id) {
        var reflections = await impulseRecordReflectionDao.getAllImpulseRecordReflection(user_id);
        let current_reflection
        if (reflections.length === 0) {
            current_reflection = await impulseRecordReflectionDao.addImpulseRecordReflection(user_id, 1);
        } else {
            current_reflection = await impulseRecordReflectionDao.getNewestReflectionForUser(user_id);
        }
        return current_reflection
    }

    async updateAndCreateNextImpulseRecordReflection(reflection) {
        var currentReflection = await this.#getOrCreateCurrentImpulseRecordReflection(reflection.user_id);
        await impulseRecordReflectionDao.updateImpulseRecordReflection(reflection, currentReflection.id)
        await impulseRecordReflectionDao.addImpulseRecordReflection(currentReflection.user_id, currentReflection.impulse_record_reflection_num + 1);
    }

    async getRecordsRelatedToCurrentReflection(user_id) {
        const reflection = await this.#getOrCreateCurrentImpulseRecordReflection(user_id)
        return await impulseRecordReflectionDao.getRecordsRelatedToReflection(reflection.id)
    }
}

module.exports =  {
    ImpulseService,
  }