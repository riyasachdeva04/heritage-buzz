const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Request = sequelize.define('Request', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  clothingImgUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  designImgUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  chosenArt: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  underscored: true,
  tableName: 'requests',
  timestamps: true,
});

module.exports = Request;
