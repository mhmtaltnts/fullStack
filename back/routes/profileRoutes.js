const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const {upload}  = require("../middleware/upload")
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);


router.route('/:id').get(profileController.getUserById)
router.route('/:id').patch(upload.single('avatar'), profileController.updateUserById)
router.route('/:id').delete(profileController.deleteUserById)

module.exports = router;