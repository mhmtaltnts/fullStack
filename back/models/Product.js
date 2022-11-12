const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.Types.ObjectId;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const reviewSchema = mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
  },
  title: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
  },

  category: { type: Array },

  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  tax: {
    type: Number,
    required: true,
    default: 0,
  },
  stockCount: {
    type: Number,
    required: true,
    default:0,
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
},
{
  timestamps: true
});

module.exports = mongoose.model("Product", productSchema);
