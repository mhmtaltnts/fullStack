const express = require("express");
const router = express.Router();
const mailController = require("../controllers/mailController.js");
const verifyJWT = require("../middleware/verifyJWT");
//const loginLimiter = require("../middleware/loginLimiter");

//router.use(verifyJWT);
router.route("/sendemail").post(mailController.mail);

module.exports = router;
