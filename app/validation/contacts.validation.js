const Joi = require("@hapi/joi")

exports.creatContactValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});

exports.updateContactValidation = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  number: Joi.number(),
  email: Joi.string().required(),
});
