const { Router } = require('express');
const authRouter = Router();
const UserController = require('../user/user.controller');
// const {RegValidateMiddleware} = require("./auth.validator")

 authRouter.post("/register", UserController.registerUser);
 authRouter.post("/login", UserController.loginUser);
 


 module.exports = authRouter;