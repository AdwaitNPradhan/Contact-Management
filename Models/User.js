const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  meta: {
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    valid: {
      type: Boolean,
      required: true,
    },
  },
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  uName: {
    type: String,
    required: true,
  },
  contact: {
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  password: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
