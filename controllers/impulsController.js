const { ImpulseStrategyDao, ImpulseRecordDao, ImpulseRecordReflectionDao } = require('../daos/impulseDao');
const { ImpulseService } = require('../services/impulseService')
const impulseStrategyDao = new ImpulseStrategyDao();
const impulseRecordDao = new ImpulseRecordDao()
const impulseRecordReflectionDao = new ImpulseRecordReflectionDao()
const impulseService = new ImpulseService()
const { 
    impulseStrategySchema, 
    impulseRecordSchema, 
    impulseRecordReflectionSchema,
    updateImpulseResponseExperienceSchema
} = require('../validationSchemas');

class ImpulseController {

    async getAllImpulseRecordByUid(req, res) {
        try {
            const records = await impulseRecordDao.getAllImpulseRecordByUid(req.query.user_id)
            res.status(200).json(records);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    }

    async createImpulseRecord(req, res) {
        const { error, value } = impulseRecordSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message }); // 400 Bad Request for validation errors
        }
        try {
          const newRecord = await impulseService.addImpulseRecord(value);
          res.status(201).json(newRecord); // 201 Created status for successful resource creation
        } catch (error) {
          res.status(500).json({ error: `An error occurred while adding the impulse record ${error}` }); // 500 Internal Server Error for server-side issues
        }
    }

    async updateImpulseResponseExperience(req, res) {
        const { error, value } = updateImpulseResponseExperienceSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message }); // 400 Bad Request for validation errors
        }
        const { impulse_id, impulse_response_experience } = value;
        try {
            await impulseRecordDao.updateImpulseResponseExperience(impulse_id, impulse_response_experience)
            res.status(200);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    }

    async updateImpulseRecordReflection(req, res) {
        const { error, value } = impulseRecordReflectionSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message }); // 400 Bad Request for validation errors
        }
        try {
            const reflection = await impulseService.updateAndCreateNextImpulseRecordReflection(value)
            res.status(200).json(reflection);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    }

    async getRecordsRelatedToCurrentReflection(req, res) {
        try {
            const records = await impulseService.getRecordsRelatedToCurrentReflection(req.query.user_id)
            res.status(200).json(records);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    }

    async getAllImpulseStrategyByUid(req, res) {
        try {
          const strategies = await impulseStrategyDao.getImpulseStrategiesByUserId(req.query.user_id);
          res.status(200).json(strategies);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    }

    async createImpulseStrategy(req, res) {
        const { error, value } = impulseStrategySchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message }); // 400 Bad Request for validation errors
          }
        const { user_id, custom_activity, details, activity_order } = value;
        try {
          const newStrategy = await impulseStrategyDao.addImpulseStrategy({ user_id, custom_activity, details, activity_order });
          res.status(201).json(newStrategy); // 201 Created status for successful resource creation
        } catch (error) {
          console.error(`Error adding impulse strategy for user_id ${user_id}:`, error);
          res.status(500).json({ error: 'An error occurred while adding the impulse strategy' }); // 500 Internal Server Error for server-side issues
        }
    }
}

module.exports = new ImpulseController();