/**
 * User CRUD routes
 * @author Shuja Naqvi
 */
const router = require('express').Router();
const user=require("../controllers/users");
const {validateUser,validateUserUpdate,isValidated}=require("../middleware/validators")
const {upload}=require("../middleware/multer")
/**
 * ////////////////////////// Routes /////////////////////////
 * @method post user signup
 * @method get get all users
 * @method get get user by id
 * @method put update user
 * @method delete delete user
 */

router.post("/",upload.single("photo"),validateUser,isValidated,user.create)
router.get("/",isValidated,user.getAll)
router.get("/:userId",isValidated,user.getById)
router.put("/:userId",upload.single("photo"),validateUserUpdate,isValidated,user.update)


// Export
module.exports = router;
