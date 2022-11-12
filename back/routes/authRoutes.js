const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");
const loginLimiter = require("../middleware/loginLimiter");

router.route("/").post(loginLimiter, authController.login);

router.route("/refresh").get(authController.refresh);

router.route("/logout").post(authController.logout);

router.route("/register").post(authController.register);

router.route("/forgot_password").post(authController.forgotPassword);
router.route("/reset_password/:id/:token").post(authController.resetPassword);

module.exports = router;
