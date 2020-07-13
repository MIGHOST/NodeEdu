// const { regValidation } = require('./auth.validator');
const {userModel} = require('../user/user.model');

exports.registrationController = (req, res) => {
  const { errror } = regValidation.validate(req.body);
  if (errror) {
    res.status(400).send('Bad request');
    return;
  }
//   const user = await 
};

