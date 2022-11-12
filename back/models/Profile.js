const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: {
    first: String,
    last: String,
  },
  photo: {
    type: String,
  },
  contact: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    postal_code: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
});
