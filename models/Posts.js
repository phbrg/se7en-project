const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const User = require('./User');

const Posts = db.define('Posts', {
    title: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false
    }
});

Posts.belongsTo(User);
User.hasMany(Posts);

module.exports = Posts;