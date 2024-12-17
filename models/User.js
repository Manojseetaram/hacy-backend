const mongoose = require('mongoose');
const { optional } = require('zod');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified:{
    type:Boolean,
    required:true,
  },

  verificationToken:{
    type:String,
    required:false
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
