const express = require('express');
const AuthRoute = express.Router();

const {signUp,login,forgotPassword,resetPassword}= require('../controller/Auth')

AuthRoute.post("/signup",signUp)
AuthRoute.post('/login',login)
AuthRoute.post('/forgotpassword',forgotPassword)
AuthRoute.put('/resetpassword',resetPassword)

module.exports=AuthRoute;