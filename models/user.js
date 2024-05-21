const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  height: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
  },
  weight: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  current_progress: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
}, {
  tableName: 'user',
  timestamps: true,
});

module.exports = User;
