/**
 * User CRUD controllers
 * @author Shuja Naqvi
 */
const Users = require('../models/Users');
const bcrypt = require('bcryptjs');
const {sequelize}=require("../database")
const bcryptSalt = process.env.BCRYPT_SALT || 10;

/**
 * Create User - Signup
 * @param {object} req
 * @param {object} res
 */
exports.create = async (req, res) => {
  try {
    let { email, password } = req.body; // Getting required fields from body
    const existingUser = await Users.findOne({where:{email: email }}); // Finding already existing user

    // Extra Validations
    if (existingUser) {
      // If we found existing user in db
      return res.status(409).json({ success: false, message: 'User already exists.' });
    }
 

    if(req.file){
      req.body.photo=process.env.BASE_URL+"/"+req.file.path
    }
    req.body.password = bcrypt.hashSync(password, parseInt(bcryptSalt)); // Hashing the password with salt 8
    // Creating User
   const user = await Users.create(req.body); // Adding user in db
    // Done
    res.json({ success: true, user }); //Success
  } catch (err) {
    // Error handling
    // eslint-disable-next-line no-console
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Get all users
 * @param {object} req
 * @param {object} res
 */
exports.getAll = async (req, res) => {
  try {
  const users=await Users.findAll(
    {
      include: 
      {
        model: sequelize.model('tbl_articles'),
      },
    })
  res.status(200).json({success:true,users})
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
    const {userId}=req.params
    const user=await Users.findByPk(userId,
      {
        include: 
        {
          model: sequelize.model('tbl_articles'),
        },
      }

    )
    res.status(200).json({success:true,user})
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
    const userId = req.params.userId; // Getting user id from URL parameter
    const user=await Users.findByPk(userId)
    if(!user){
      res.status(404).json({ success: false, message: 'user not found' });
    }
    user.update(req.body)
    user.save()
    res.json({ success: true, user }); // Success
  } catch (err) {
    // Error handling
    // eslint-disable-next-line no-console
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Delete user
 * @param {object} req
 * @param {object} res
 */
exports.delete = async (req, res) => {
  try {
    // const userId = req.params.userId; // Getting user id from URL parameter
    
    res.json({ success: true, user }); // Success
  } catch (err) {
    // Error handling
    // eslint-disable-next-line no-console
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
