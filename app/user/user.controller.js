const bcrypt = require('bcrypt');
const userModel = require('./user.model');
const { sault } = require('../../config');
const { LoginValidation } = require('../auth/auth.validator');
const { creatToken } = require('../../services/auth.services');
const { prepareUserResponse } = require('../../helpers/helpers');

class UserController {
  async registerUser(req, res) {
    try {
      const { email, password } = req.body;
      const userEmail = await userModel.findOne({ email });
      if (userEmail) {
        return res.status(409).send({ message: 'Email in use' });
      }
      const hashPassword = await bcrypt.hash(password, sault);
      const userData = { ...req.body, password: hashPassword };
      const user = await userModel.create(userData);
      if (!user) {
        return res.status(400).send({ message: 'User not creat' });
      }
      return res
        .status(201)
        .send({ email: user.email, subscription: user.subscription });
    } catch (error) {
      res.status(500).send('Server error');
    }
  }
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(401).send({ message: 'Email or password is wrong' });
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).send({ message: 'Email or password is wrong' });
      }
      const newToken = await creatToken(user._id);
      const userWithToken = await userModel.findByIdAndUpdate(user._id, {
        token: newToken,
      });
      res.status(200).json({
        email: userWithToken.email,
        subscription: userWithToken.subscription,
        token: newToken,
      });
    } catch (error) {
      res.status(500).send('Server error');
    }
  }

  async logoutUser(req, res) {
    try {
      const { user } = req;
      await userModel.findByIdAndUpdate(user._id, { token: null });
      return res.status(204).send();
    } catch (error) {
      res.status(500).send('Server error');
    }
  }
  getCurrentUser(req, res) {
    const { user } = prepareUserResponse(req.user);
    return res.status(200).send(user);
  }

  async getUsers(req, res) {
    try {
      const users = await userModel.find(req.quey, {
        password: false,
        _id: false,
      });
      if (!users) {
        return res.status(400).send({ message: 'User not founded' });
      }
      return res.status(201).send(users);
    } catch (error) {
      res.status(500).send('Server error');
    }
  }

  async changeUserStatus(req, res) {
    try {
      const { user } = req;
      await userModel.findByIdAndUpdate(
        user._id,
        { $set: req.body },
        { new: true },
      );
      return res.status(204).send();
    } catch (error) {
      res.status(500).send('Server error');
    }
  }
}

module.exports = new UserController();
