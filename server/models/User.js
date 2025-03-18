const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema
const UserSchema = new Schema(
  {
    displayname: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

module.exports = model('User', UserSchema);
