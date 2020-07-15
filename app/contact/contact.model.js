const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema } = require('mongoose');

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subscription: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String, required: false },
});

async function findContactByIdAndUpdate(contactId, updateParams) {
  return this.findByIdAndUpdate(
    contactId,
    {
      $set: updateParams,
    },
    {
      new: true,
    },
  );
}
contactSchema.statics.findContactByIdAndUpdate = findContactByIdAndUpdate;
contactSchema.plugin(mongoosePaginate)
const contactModel = mongoose.model('Contact', contactSchema);
module.exports = contactModel;
