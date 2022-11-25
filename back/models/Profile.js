const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: {
    first: {type: String,
            required: true},
    last: {type: String,
           required: true}
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
    },
    country: {
      type: String,
      required: true,
    },
    postal_code: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
});
