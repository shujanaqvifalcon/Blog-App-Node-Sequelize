/**
 * Articles CRUD controllers
 * @author Shuja Naqvi
 */
 const Article = require('../models/Articles');
 const Users=require("../models/Users")
 const Comments=require("../models/Comments")
 const {sequelize}=require("../database")
 /**
  * Create User - Signup
  * @param {object} req
  * @param {object} res
  */
 exports.create = async (req, res) => {
   try {
    const {authorId,articleId}=req.body;
     const author=await Users.findByPk(authorId)
     const article=await Article.findByPk(articleId)
     if(!author || ! article){
     return res.status(404).json({ success: false, message: 'Author Id || author is Invalid' });
     }
    const comment = await Comments.create(req.body);
    article.tblCommentId=comment.id
    author.tblCommentId=comment.id
    await article.save()
    await author.save()
     // Done
     res.json({ success: true, comment }); //Success
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
   const comments=await Comments.findAll({include: [
    {
       model: sequelize.model('tbl_users'),
      
    },
    {
      model: sequelize.model('tbl_articles'),
     
   },
  ]})
   res.status(200).json({success:true,comments})
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
     const {commentId}=req.params
     const comment=await Comments.findByPk(commentId,{include: [
      {
         model: sequelize.model('tbl_users'),
        
      },
      {
        model: sequelize.model('tbl_articles'),
       
     },
    ]})
     res.status(200).json({success:true,comment})
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
 
 