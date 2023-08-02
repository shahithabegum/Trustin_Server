const express = require('express');
const UserRoute = express.Router();
const {authToken} = require('../controller/verifyToken')

const {getAllUser,getbyId,updateUser}= require('../controller/Usercontroller')

UserRoute.get('/getbyid/:_id',authToken,getbyId)
UserRoute.get('/getuser',authToken,getAllUser)
UserRoute.put('/update',authToken,updateUser)

module.exports=UserRoute;