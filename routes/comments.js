/**
 * User CRUD routes
 * @author Shuja Naqvi
 */
 const router = require('express').Router();
const comment=require("../controllers/comments")
const {ValidateComment,isValidated}=require("../middleware/validators")
 /**
  * ////////////////////////// Routes /////////////////////////
  * @method post user signup
  * @method get get all users
  * @method get get user by id
  * @method put update user
  * @method delete delete user
  */
 
  router.post("/",ValidateComment,isValidated,comment.create)
  router.get("/",comment.getAll)
  router.get("/:commentId",comment.getById)
  router.put("/:commentId",ValidateComment,isValidated,comment.update)
 
 
 // Export
 module.exports = router;
 