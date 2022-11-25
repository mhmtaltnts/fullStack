const User = require("../models/User");
const Order = require("../models/Order");
const bcrypt = require("bcrypt");
const PORT = process.env.PORT || 9999;

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
const updateUserById = async (req, res) => {
  const {id} = reg.params
  const { first, last, address, region, country, postalCode, phone } = req.body;
  const avatar = `http://localhost:PORT/${req.file.path}`

  // Confirm data
  if (
    !name ||
    !contact
  ) {
    return res
      .status(400)
      .json({ message: "All fields are required" });
  }

  // Does the user exist to update?
  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  user.name.first = first
  user.name.last = last
  
  user.contact.address = address
  user.contact.city = city
  user.contact.country = country
  user.contact.postalCode = postalCode
  user.contact.phone = phone
  user.avatar = avatar

  

  

  const updatedUser = await user.save();

  res.json({ message: `User with ${updatedUser.name.first} ${updatedUser.name.last} updated` });
};

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUserById = async (req, res) => {
  const { id } = req.params;
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

  const reply = `User with name: ${result.name.first} and ID: ${result._id} deleted`;

  res.json(reply);
};


module.exports = {
  getUserById,
  updateUserById,
  deleteUserById,
};