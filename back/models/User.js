const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  username: {type: String},
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    default: "Customer",
  },
  active: {
    type: Boolean,
    default: true,
  },
  
});

module.exports = mongoose.model("User", userSchema);
