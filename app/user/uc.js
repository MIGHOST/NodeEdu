const bcrypt = require('bcrypt');
const userModel = require('./user.model');
const sault = require('../../config');

exports.UserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, sault);
    const user = await userModel.create({ email, password: hashPassword });
    res.status(201);
  } catch (error) {
    console.log('test');
  }
};
      