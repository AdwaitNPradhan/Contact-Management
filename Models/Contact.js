const mongoose = require("mongoose");
const ContactSchema = new mongoose.Schema({
  meta: {
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    deleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  cName: {
    type: String,
    requrired: true,
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
  cType: {
    type: String,
    required: true,
  },
});
const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
