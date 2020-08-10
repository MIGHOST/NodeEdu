const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { boolean } = require('yargs');

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
  status: {
    type: String,
    required: true,
    enum: ['Verified', 'Created'],
    default: 'Created',
  },
  verificationToken: { type: String, required: false },
});
userSchema.static('updateUser', async function (id, updateParams) {
  const user = await this.findById(id);
  if (!user) throw new Error('User not found');

  Object.keys(updateParams).forEach(name => {
    user[name] = updateParams[name];
  });

  return user.save();
});


userSchema.static('findByVerificationToken', async function (
  verificationToken,
) {
  return this.findOne({
    verificationToken,
  });
});

userSchema.static('verifyUser', async function (id) {
  return this.findByIdAndUpdate(
    id,
    {
      status: 'Verified',
      verificationToken: null,
    },
    {
      new: true,
    },
  );
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
