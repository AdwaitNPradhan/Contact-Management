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
    },
    createdBy: {
      type: String,
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
      default: "NULL",
      required: true,
    },
    phone: {
      type: String,
      default: "NULL",
      required: true,
    },
  },
  cType: {
    type: String,
    default: "SELF",
    required: true,
  },
});
const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
