const { Router } = require('express');
const userRouter = Router();
const {UserController} = require('./uc');


 userRouter.post("/register", UserController) 

 module.exports = userRouter;