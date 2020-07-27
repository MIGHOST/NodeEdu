const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatarURL: String,
  subscription: {
    type: String,
    enum: ['free', 'pro', 'premium'],
    default: 'free',
  },
  token: { type: String, required: false },
});
userSchema.static('updateUser', async function (id, updateParams) {
  const user = await this.findById(id);

  if (!user) throw new Error('User not found');

  Object.keys(updateParams).forEach(name => {
    user[name] = updateParams[name];
  });

  return user.save();
});
const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
