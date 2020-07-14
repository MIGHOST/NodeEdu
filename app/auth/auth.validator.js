const Joi = require('@hapi/joi');

const regValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
exports.RegValidateMiddleware = (req, res, next) => {
  const { error } = regValidation.validate(req.body);
  if (error) {
    res.status(403).send('Bad request');
    return;
  }
  next();
};

exports.LoginValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});