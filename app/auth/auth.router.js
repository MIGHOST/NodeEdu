const { Router } = require('express');
const authRouter = Router();
const UserController = require('../user/user.controller');
const { tokenMiddleware } = require('../../middleware/auth.middleware');
const { RegValidateMiddleware } = require('./auth.validator');

authRouter.get('/current', tokenMiddleware, UserController.getCurrentUser);
authRouter.post(
  '/register',
  RegValidateMiddleware,
  UserController.registerUser,
);
authRouter.post('/login', RegValidateMiddleware, UserController.loginUser);
authRouter.post('/logout', tokenMiddleware, UserController.logoutUser);

module.exports = authRouter;
