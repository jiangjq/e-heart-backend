const Sequelize = require('sequelize');
const sequelize = require('../utils/db');

// 导入所有模型
const User = require('./user');
// const DietLog = require('./dietLog');
// const FoodPurgeLog = require('./foodPurgeLog');
// const MealPlan = require('./mealPlan');
// const ImpulseRecord = require('./impulseRecord');
// const ImpulseStrategy = require('./impulseStrategy');
// const DietLogReflection = require('./dietLogReflection');
// const MealPlanReflection = require('./mealPlanReflection');
// const ImpulseRecordReflection = require('./impulseRecordReflection');
// const DietLogReflectionLink = require('./dietLogReflectionLink');
// const FoodPurgeReflectionLink = require('./foodPurgeReflectionLink');
// const MealPlanReflectionLink = require('./mealPlanReflectionLink');
// const ImpulseRecordReflectionLink = require('./impulseRecordReflectionLink');

// 定义模型之间的关系
// User.hasMany(DietLog, { foreignKey: 'user_id' });
// DietLog.belongsTo(User, { foreignKey: 'user_id' });

// User.hasMany(FoodPurgeLog, { foreignKey: 'user_id' });
// FoodPurgeLog.belongsTo(User, { foreignKey: 'user_id' });

// User.hasMany(DietLogReflection, { foreignKey: 'user_id' });
// DietLogReflection.belongsTo(User, { foreignKey: 'user_id' });

// User.hasMany(MealPlan, { foreignKey: 'user_id' });
// MealPlan.belongsTo(User, { foreignKey: 'user_id' });

// User.hasMany(ImpulseRecord, { foreignKey: 'user_id' });
// ImpulseRecord.belongsTo(User, { foreignKey: 'user_id' });

// User.hasMany(ImpulseStrategy, { foreignKey: 'user_id' });
// ImpulseStrategy.belongsTo(User, { foreignKey: 'user_id' });

// DietLog.hasMany(DietLogReflectionLink, { foreignKey: 'diet_log_id' });
// DietLogReflectionLink.belongsTo(DietLog, { foreignKey: 'diet_log_id' });

// DietLogReflection.hasMany(DietLogReflectionLink, { foreignKey: 'reflection_id' });
// DietLogReflectionLink.belongsTo(DietLogReflection, { foreignKey: 'reflection_id' });

// MealPlan.hasMany(MealPlanReflectionLink, { foreignKey: 'meal_plan_id' });
// MealPlanReflectionLink.belongsTo(MealPlan, { foreignKey: 'meal_plan_id' });

// MealPlanReflection.hasMany(MealPlanReflectionLink, { foreignKey: 'reflection_id' });
// MealPlanReflectionLink.belongsTo(MealPlanReflection, { foreignKey: 'reflection_id' });

// ImpulseRecord.hasMany(ImpulseRecordReflectionLink, { foreignKey: 'impulse_record_id' });
// ImpulseRecordReflectionLink.belongsTo(ImpulseRecord, { foreignKey: 'impulse_record_id' });

// ImpulseRecordReflection.hasMany(ImpulseRecordReflectionLink, { foreignKey: 'reflection_id' });
// ImpulseRecordReflectionLink.belongsTo(ImpulseRecordReflection, { foreignKey: 'reflection_id' });

// FoodPurgeLog.hasMany(FoodPurgeReflectionLink, { foreignKey: 'food_purge_log_id' });
// FoodPurgeReflectionLink.belongsTo(FoodPurgeLog, { foreignKey: 'food_purge_log_id' });

// DietLogReflection.hasMany(FoodPurgeReflectionLink, { foreignKey: 'reflection_id' });
// FoodPurgeReflectionLink.belongsTo(DietLogReflection, { foreignKey: 'reflection_id' });

// 导出所有模型
module.exports = {
  sequelize,
  Sequelize,
  User,
//   MealPlan,
//   DietLog,
//   FoodPurgeLog
//   ImpulseRecord,
//   ImpulseStrategy,
//   DietLogReflection,
//   MealPlanReflection,
//   ImpulseRecordReflection,
//   DietLogReflectionLink,
//   FoodPurgeReflectionLink,
//   MealPlanReflectionLink,
//   ImpulseRecordReflectionLink,
};
