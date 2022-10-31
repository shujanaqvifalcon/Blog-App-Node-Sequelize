/**
 * User schema
 * @author Shuja Naqvi
 */

// Schema
const { Sequelize, DataTypes } = require('sequelize');
const moment = require('moment-timezone');
const db = require('../database');
const Articles = db.sequelize.define(
  'tbl_articles',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
      title: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(100),
      },
      body: Sequelize.STRING,
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
    modelName: 'Articles',
  }
);


//export
// db.sequelize.sync();

module.exports = Articles;