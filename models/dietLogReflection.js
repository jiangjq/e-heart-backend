const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const DietLogReflection = sequelize.define('DietLogReflection', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reflection_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    goal_met: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    reason_for_not_meeting_goal: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    strategy_for_not_meeting_goal: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    // add other fields as needed
  }, {
    tableName: 'diet_log_reflections',
    timestamps: true,
  });

  return DietLogReflection;
};
