const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = require('../utils/db');
const UserModel = require('./user');
const User = UserModel(sequelize, Sequelize);
const ImpulseRecord = sequelize.define('ImpulseRecord', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
        model: 'users',
        key: 'id',
    },
    allowNull: false,
  },
  impulse_type: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  intensity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  trigger: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  plan: {
    type: DataTypes.STRING(256),
    allowNull: true,
  },
  impulse_response_experience: {
    type: DataTypes.STRING(256),
    allowNull: true,
  },
}, {
  tableName: 'impulse_record',
  timestamps: true,
});

User.hasMany(ImpulseRecord);
ImpulseRecord.belongsTo(User);


const ImpulseRecordReflection = sequelize.define('ImpulseRecordReflection', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
        model: 'users',
        key: 'id',
    },
    allowNull: false,
  },
  reflection_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  record_impulses_immediately: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  reasons_not_record_impulses: {
    type: DataTypes.STRING(256),
    allowNull: true,
  },
  strategies_not_record_impulses: {
    type: DataTypes.STRING(256),
    allowNull: true,
  },
  use_alternatives: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  impulse_persistence_minutes: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  impulse_persistence_barriers: {
    type: DataTypes.STRING(256),
    allowNull: true,
  },
  impulse_persistence_methods: {
    type: DataTypes.STRING(256),
    allowNull: true,
  },
  impulse_persistence_effects: {
    type: DataTypes.STRING(256),
    allowNull: true,
  },
  impulse_persistence_improvement_areas: {
    type: DataTypes.STRING(256),
    allowNull: true,
  },
  impulse_record_reflection_num : {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'impulse_record_reflection',
  timestamps: true,
});

User.hasMany(ImpulseRecordReflection);
ImpulseRecordReflection.belongsTo(User);


ImpulseRecord.belongsToMany(ImpulseRecordReflection, { through: 'ImpulseRecordReflectionLink' });
ImpulseRecordReflection.belongsToMany(ImpulseRecord, { through: 'ImpulseRecordReflectionLink' });


const ImpulseStrategy = sequelize.define('ImpulseStrategy', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
        model: 'users',
        key: 'id',
    },
    allowNull: false,
  },
  custom_activity: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  details: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  activity_order: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'impulse_strategy',
  timestamps: true,
});
User.hasMany(ImpulseStrategy);
ImpulseStrategy.belongsTo(User);

module.exports = { 
  ImpulseRecord, 
  ImpulseRecordReflection,
  ImpulseStrategy,
 }


 /**
  * 冲动记录反思 增加是否完成字段，完成日期字段
  * 每次有新用户注册，插入两条冲动记录反思 是否完成 = 否
  * 每次反思时，查询上一次完成的冲动反思记录的完成日期A， 返回从A至今的所有 冲动记录，如果是第一次则返回至今所有的冲动记录
  * 用户提交反思，更新 是否完成 = 是， 记录日期
  */