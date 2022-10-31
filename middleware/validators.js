/**
 * All the validation
 * @author Shuja Naqvi
 */
const { check, validationResult } = require('express-validator');

/*
====================
Validations
====================
*/

// You can create multiple validations strategies (Read express-validator documentation for more details)
// User Signup Validation
exports.validateUser = [
  check('name', 'Name is required.').notEmpty().trim(),
  check('email', 'Email is required.').notEmpty().isEmail().trim(),
  check('password', 'Password is required.').notEmpty().trim().isLength({ min: 8 }),
  check('bio', 'bio is required.').notEmpty().trim().isLength({ min: 8 }),
];

// User Signup Validation
exports.validateUserUpdate = [
  check('name', 'Name is required.').notEmpty().trim(),
  check('email', 'Email is required.').notEmpty().isEmail().trim(),
  check('bio', 'bio is required.').notEmpty().trim().isLength({ min: 8 }),
];

// Login validation
exports.validateLogin = [
  check('email', 'Email is required').notEmpty().isEmail().trim().toLowerCase(),
  check('password', 'Password is required.').notEmpty().trim().isLength({ min: 8 }),
];

exports.ValidateArticle = [
  check('title', 'title is required').notEmpty().trim(),
  check('description', 'Description is required').notEmpty().trim(),
  check('body', 'Body is required').notEmpty().trim(),
  check('authorId',"Author Id is required").notEmpty().trim(),
];

exports.ValidateComment = [
  check('body', 'body is required').notEmpty().trim(),
  check('articleId', 'articleId is required').notEmpty().trim(),
  check('authorId',"Author Id is required").notEmpty().trim(),
];
/*
======================
Result
======================
*/

/**
 * To check if request validated successfully or not, according to our validation strategies
 * @param {object} req
 * @param {object} res
 * @param {*} next
 */
exports.isValidated = (req, res, next) => {
  const errors = validationResult(req); // Validating the request by previous middleware's strategy
  if (!errors.isEmpty()) {
    // On error
    res.status(400).send({ success: false, message: errors.array()[0] }); // Sending first error to the client from array of errors
  } else {
    // Validated successfully
    next(); // Pass the request to next middleware or controller
  }
};
