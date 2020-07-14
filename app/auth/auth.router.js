const { Router } = require('express');
const authRouter = Router();
const UserController = require('../user/user.controller');
const { tokenMiddleware } = require('../../middleware/auth.middleware');
// const {RegValidateMiddleware} = require("./auth.validator")

authRouter.post('/register', UserController.registerUser);
authRouter.post('/login', UserController.loginUser);
authRouter.post('/logout', tokenMiddleware, UserController.logoutUser);
authRouter.get('/current', UserController.loginUser);


module.exports = authRouter;
