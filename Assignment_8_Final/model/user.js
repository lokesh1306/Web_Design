const mongoose = require("mongoose");
const validator = require("validator");
//const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true,
    unique: false
  },

  email: {
    type: String,
    required: true,
    unique: true,
    //validate: [validator.isEmail, " Please provide a valid email"],
  },

  password: {
    type: String,
    required: true,
    minLength: 8,
    //select: false,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
