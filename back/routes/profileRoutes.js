const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);


router.route('/:id').get(usersController.getUserById)
router.route('/:id').delete(usersController.deleteUserById)

module.exports = router;