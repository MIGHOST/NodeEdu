const { Router } = require('express');
const userRouter = Router();
const multer = require('multer');
const UserController = require('./user.controller');
const { tokenMiddleware } = require('../../middleware/auth.middleware');
const { minifyAvatar, storage } = require('../../middleware/images.middleware');

const upload = multer({ storage });

userRouter.get('/', tokenMiddleware, UserController.getUsers);
userRouter.patch('/', tokenMiddleware, UserController.changeUserStatus);
userRouter.patch(
  '/avatars',
  tokenMiddleware,
  upload.single('img_file'),
  minifyAvatar,
  UserController.changeUserAvatar,
);

module.exports = userRouter;
