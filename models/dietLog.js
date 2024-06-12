const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const DietLog = sequelize.define('DietLog', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    eating_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    food_details: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    emotion_intensity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    emotion_type: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    eating_location: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    specific_location: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    dieting: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    binge_eating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    trigger: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    additional_info: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
  }, {
    tableName: 'diet_logs',
    timestamps: true,
  });

  return DietLog;
};
