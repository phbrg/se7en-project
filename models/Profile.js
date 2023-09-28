const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const User = require('./User');

const Profile = db.define('Profile', {
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    badges: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [] // can be null
    },
    discord: {
      type: DataTypes.STRING,
      allowNull: true
    },
    steam: {
      type: DataTypes.STRING,
      allowNull: true
    },
    github: {
      type: DataTypes.STRING,
      allowNull: true
    },
    instagram: {
      type: DataTypes.STRING,
      allowNull: true
    },
    twitter: {
      type: DataTypes.STRING,
      allowNull: true
    },
});

Profile.belongsTo(User);
User.hasOne(Profile);

module.exports = Profile;