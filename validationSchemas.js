const Joi = require('joi');

const impulseRecordSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    impulse_type: Joi.string().max(256).required(),
    time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).required(),
    date: Joi.date().optional(), // Validation for date
    intensity: Joi.number().integer().required(),
    trigger: Joi.string().max(256).required(),
    plan: Joi.string().max(256).optional(),
    impulse_response_experience: Joi.string().optional(),
});

const updateImpulseResponseExperienceSchema = Joi.object({
    impulse_record_id: Joi.number().integer().required(),
    impulse_response_experience: Joi.string().max(256).required(),
});

const impulseRecordReflectionSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    reflection_date: Joi.date().required(),
    record_impulses_immediately: Joi.boolean().required(),
    reasons_not_record_impulses: Joi.string().max(255).optional(),
    strategies_not_record_impulses: Joi.string().max(255).optional(),
    use_alternatives: Joi.boolean().optional(),
    impulse_persistence_minutes: Joi.number().integer().optional(),
    impulse_persistence_barriers: Joi.string().max(255).optional(),
    impulse_persistence_methods: Joi.string().max(255).optional(),
    impulse_persistence_effects: Joi.string().max(255).required(),
    impulse_persistence_improvement_areas: Joi.string().max(255).required(),
  });

const impulseStrategySchema = Joi.object({
  user_id: Joi.number().integer().required(),
  custom_activity: Joi.string().max(256).required(),
  details: Joi.string().max(256).required(),
  activity_order: Joi.number().integer().optional(),
});



module.exports = {
  impulseRecordSchema,
  updateImpulseResponseExperienceSchema,
  impulseRecordReflectionSchema,
  impulseStrategySchema,
};