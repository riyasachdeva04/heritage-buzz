const sequelize = require('../config/db.js');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },

}, {
    tableName: 'users',
    timestamps: true,
    underscored: true
}
);

module.exports = User;
