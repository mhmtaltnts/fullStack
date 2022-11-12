const { nextDay } = require("date-fns");
const express = require("express");
const router = express.Router();
const path = require("path");
const passwordReset = require("../controllers/pwdResetController.js");

router.get("^/$|/index(.html)?", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
  next()
});


module.exports = router;
