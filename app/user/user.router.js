const { Router } = require('express');
const userRouter = Router();
const UserController = require('./user.controller');
const { tokenMiddleware } = require('../../middleware/auth.middleware');

userRouter.get('/', tokenMiddleware, UserController.getUsers);
userRouter.patch('/', tokenMiddleware, UserController.changeUserStatus);
module.exports = userRouter;
