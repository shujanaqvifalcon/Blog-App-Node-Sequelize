/**
 * User CRUD routes
 * @author Shuja Naqvi
 */
 const router = require('express').Router();
 const article=require("../controllers/articles");
 const {ValidateArticle,isValidated}=require("../middleware/validators")
 
 /**
  * ////////////////////////// Routes /////////////////////////
  * @method post user signup
  * @method get get all users
  * @method get get user by id
  * @method put update user
  * @method delete delete user
  */
 
 router.post("/",ValidateArticle,isValidated,article.create)
 router.get("/",article.getAll)
 router.get("/:articleId",article.getById)
 router.put("/:articleId",ValidateArticle,isValidated,article.update)
 
 
 // Export
 module.exports = router;
 