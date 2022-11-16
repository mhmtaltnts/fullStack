const User = require("../models/User");
const Order = require("../models/Order");
const bcrypt = require("bcrypt");


// @desc Get all users
// @route GET /users
// @access Private
const getUserById = async (req, res) => {

  const {id} = req.params
  console.log(id)

  // Get all users from MongoDB
  const user = await User.findById(id).exec();
console.log(user)
//res.setHeader('Content-Type', 'application/json')
  // If no users
  if (!user) {
    return res.status(400).json({ message: "No user found" });
  }
  

  res.status(200).json(user);
};


// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = async (req, res) => {
  const { id, email, password } = req.body;

  // Confirm data
  if (
    !id ||
    !email
  ) {
    return res
      .status(400)
      .json({ message: "All fields except password are required" });
  }

  // Does the user exist to update?
  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Check for duplicate
  const duplicate = await User.findOne({ email })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  // Allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  user.email = email;
  user.roles = roles;
  user.active = active;

  if (password) {
    // Hash password
    user.password = await bcrypt.hash(password, 10); // salt rounds
  }

  const updatedUser = await user.save();

  res.json({ message: `User with ${updatedUser.email} updated` });
};

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = async (req, res) => {
  const { id } = req.body;
  console.log(id)
  
  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "User ID Required" });
  }

  // Does the user still have assigned orderss?
  const order = await Order.findOne({ user: id }).lean().exec();
  if (order) {
    return res.status(400).json({ message: "User has assigned orders" });
  }

  // Does the user exist to delete?
  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const result = await user.deleteOne();

  const reply = `User with email: ${result.email} and ID: ${result._id} deleted`;

  res.json(reply);
};


module.exports = {
  getUserById,
  updateUser,
  deleteUserById,
};