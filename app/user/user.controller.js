require('dotenv').config();
const PORT = process.env.PORT;
const userModel = require('./user.model');

class UserController {
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

  async changeUserAvatar(req, res) {
    try {
      const { user, file } = req;
      const { filename } = file;
      const avatarURL = `http://localhost:${PORT}/images/${filename}`;
      await userModel.updateUser(user._id, { avatarURL });
      return res.status(200).json({
        avatarURL,
      });
    } catch (error) {
      res.status(500).send('Server error');
    }
  }
}

module.exports = new UserController();
