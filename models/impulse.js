const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const User = require('./user')

const ImpulseRecord = sequelize.define('ImpulseRecord', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
        model: 'User',
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
        model: 'User',
        key: 'id',
    },
    allowNull: false,
  },
  reflection_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  record_impulses_immediately: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
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
    allowNull: false,
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
    allowNull: false,
  },
  impulse_persistence_improvement_areas: {
    type: DataTypes.STRING(256),
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
        model: 'User',
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

const impulseRecordReview = sequelize.define('impulseRecordReview', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
        model: 'User',
        key: 'id',
    },
    allowNull: false,
  },
  impulse_response_experience: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
}, {
  tableName: 'impulse_record_review',
  timestamps: true,
});

User.hasMany(impulseRecordReview);
impulseRecordReview.belongsTo(User);


module.exports = { 
  ImpulseRecord, 
  ImpulseRecordReflection
 }
