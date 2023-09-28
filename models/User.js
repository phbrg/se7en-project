const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    }
});

module.exports = User;