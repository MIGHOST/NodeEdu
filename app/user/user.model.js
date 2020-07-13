const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new Schema({
  email: String,
  password: String,
  // email: { type: String, required: true, unique: true },
  // password: { type: String, required: true },
//   subscription: {
//     type: String,
//     enum: ['free', 'pro', 'premium'],
//     default: 'free',
//   },
//   token: String,
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
