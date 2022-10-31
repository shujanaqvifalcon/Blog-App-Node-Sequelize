/**
 * Database connection
 * @author Shuja Naqvi
 */

// create the connection to database
require('dotenv').config();

const Sequelize = require('Sequelize');
const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  operationsAliases: false,
  pool: {
    max: parseInt(process.env.POOL_MAX),
    min: parseInt(process.env.POOL_MIN),
    acquire: process.env.ACQUIRE,
    idle: process.env.POOL_IDLE,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize
  .authenticate()
  .then(() => {
    const Users=require("./models/Users")
    const Articles=require("./models/Articles")
    const Comments =require("./models/Comments")
    Users.hasMany(Articles , {foreignKey: 'authorId',sourceKey: 'id'});
    Articles.belongsTo(Users , {foreignKey: 'authorId',targetKey: 'id'});
    Articles.hasMany(Comments , {foreignKey: 'articleId',sourceKey: 'id'});
    Comments.belongsTo(Articles,{foreignKey: 'articleId',targetKey: 'id'})
    Users.hasMany(Comments , {foreignKey: 'authorId',sourceKey: 'id'});
    Comments.belongsTo(Users,{foreignKey: 'authorId',targetKey: 'id'})
    db.sequelize.sync()
    console.log('Database Connected Suucessfully :-)');
  })
  .catch((err) => {
    console.log('connection Error--->', err.message);
  });

module.exports = {sequelize:db.sequelize,db};