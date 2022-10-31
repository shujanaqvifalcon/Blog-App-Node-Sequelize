/**
 * User schema
 * @author Shuja Naqvi
 */

// Schema
const { Sequelize, DataTypes } = require('sequelize');
const db = require('../database');
const Comments = db.sequelize.define(
  'tbl_comments',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    body: {
        type: Sequelize.STRING,
        allowNull: false
      }
  },
  {
    modelName: 'Comments',
  }
);

 
//export
module.exports = Comments;