/**
 * Articles CRUD controllers
 * @author Shuja Naqvi
 */
 const Article = require('../models/Articles');
 const Users=require("../models/Users")
 const {sequelize}=require("../database")
 /**
  * Create User - Signup
  * @param {object} req
  * @param {object} res
  */
 exports.create = async (req, res) => {
   try {
    const {authorId}=req.body;
     const author=await Users.findByPk(authorId)
     if(!author){
     return res.status(404).json({ success: false, message: 'Author Id is Invalid' });
     }
    const article = await Article.create(req.body);
    // author.tblArticleId=article.id
    // await author.save()
     // Done
     res.json({ success: true, article }); //Success
   } catch (err) {
     // Error handling
     // eslint-disable-next-line no-console
     console.log('Error ----> ', err);
     res.status(500).json({ success: false, message: 'Internal server error' });
   }
 };
 
 /**
  * Get all articles
  * @param {object} req
  * @param {object} res
  */
 exports.getAll = async (req, res) => {
   try {
   const articles=await Article.findAll({include: [
    {
    model: sequelize.model('tbl_comments'),
    },
  {
    model: sequelize.model('tbl_users'),
  },
  ]
})
   res.status(200).json({success:true,articles})
   } catch (err) {
     // Error handling
     // eslint-disable-next-line no-console
     console.log('Error ----> ', err);
     res.status(500).json({ success: false, message: 'Internal server error' });
   }
 };
 
 /**
  * Get user by id
  * @param {object} req
  * @param {object} res
  */
 exports.getById = async (req, res) => {
   try {
     const {articleId}=req.params
     const article=await Article.findByPk(articleId,{include: [
      {
      model: sequelize.model('tbl_comments'),
      },
    {
      model: sequelize.model('tbl_users'),
    },
    ]
  })
     res.status(200).json({success:true,article})
   } catch (err) {
     // Error handling
     // eslint-disable-next-line no-console
     console.log('Error ----> ', err);
     res.status(500).json({ success: false, message: 'Internal server error' });
   }
 };
 
 /**
  * Update user
  * @param {object} req
  * @param {object} res
  */
 exports.update = async (req, res) => {
   try {
     const articleId = req.params.articleId; // Getting user id from URL parameter
     const article=await Article.findByPk(articleId)
     if(!article){
       res.status(404).json({ success: false, message: 'user not found' });
     }
     article.update(req.body)
    await article.save()
     res.json({ success: true, article }); // Success
   } catch (err) {
     // Error handling
     // eslint-disable-next-line no-console
     console.log('Error ----> ', err);
     res.status(500).json({ success: false, message: 'Internal server error' });
   }
 };
 
 
 