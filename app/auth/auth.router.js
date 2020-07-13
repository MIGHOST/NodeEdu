const { Router } = require('express');
const authRouter = Router();
const UserController = require('../user/user.controller');
const {RegValidateMiddleware} = require("./auth.validator")

 authRouter.post("/register", RegValidateMiddleware, UserController.createUser) 

 module.exports = authRouter;