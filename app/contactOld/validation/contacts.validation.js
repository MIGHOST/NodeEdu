const Joi = require('@hapi/joi');

exports.creatContactValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});
