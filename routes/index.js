/**
 * All api routes handles here
 * @author Shuja Naqvi
 */
const router = require('express').Router();

// Parent Routes
router.use('/users', require('./users')); // All the user routes
router.use("/auth",require("./auth"))
// router.use('/profiles', require('./profiles')); // All the profiles routes
// router.use('/tags', require('./tags')); // All the tags routes
 router.use('/comments', require('./comments')); // All the comments routes
router.use('/articles', require('./articles')); // All the comments routes
// Export
module.exports = router;
