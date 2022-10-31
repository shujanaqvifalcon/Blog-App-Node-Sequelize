/**
 * User schema
 * @author Shuja Naqvi
 */

// Schema
const { Sequelize, DataTypes } = require('sequelize');
const moment = require('moment-timezone');
const db = require('../database');
const Articles = require('./Articles');
const Users = db.sequelize.define(
  'tbl_users',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      validate:{
        isEmail:true
      },
      allowNull: false,
    },
    password : {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    bio : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      allowNull: false,
    },
  },
  {
    modelName: 'Users',
  }
);



// sync model
//db.sequelize.sync();

//export
module.exports = Users;