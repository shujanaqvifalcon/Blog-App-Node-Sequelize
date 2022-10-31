/**
 * User CRUD routes
 * @author Shuja Naqvi
 */
 const router = require('express').Router();
 const auth=require("../controllers/auth")
 const {validateLogin,isValidated}=require("../middleware/validators")
 /**
  * ////////////////////////// Routes /////////////////////////
  * @method post user login
  */
 
 router.post("/login",validateLogin,isValidated,auth.login)
 
 // Export
 module.exports = router;
 