const Joi = require('@hapi/joi');

const creatContactValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  subscription: Joi.string(),
  password: Joi.string().required(),
  token: Joi.string(),
});

exports.contactValidateMiddleware = (req, res, next) => {
  const { error } = creatContactValidation.validate(req.body);
  if (error) {
    res.status(403).send('Bad request');
    return;
  }
  next();
};