const { Router } = require('express');
const authRouter = Router();
const UserController = require('../user/user.controller');
const AuthController = require('./auth.controller');
const { tokenMiddleware } = require('../../middleware/auth.middleware');
const { RegValidateMiddleware } = require('./auth.validator');

authRouter.get('/current', tokenMiddleware, AuthController.getCurrentUser);
authRouter.post(
  '/register',
  RegValidateMiddleware,
  AuthController.registerUser,
);
authRouter.post('/login', RegValidateMiddleware, AuthController.loginUser);
authRouter.post('/logout', tokenMiddleware, AuthController.logoutUser);
authRouter.get('/verify/:verificationToken', AuthController.verifyEmail);

module.exports = authRouter;
