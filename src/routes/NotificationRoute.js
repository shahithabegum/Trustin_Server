const express = require('express');
const NotificationRoute = express.Router();

const {generateNotification,getNotification,unRead,rejectNotification} = require('../controller/NotificationController')

NotificationRoute.post("/notification", generateNotification)
NotificationRoute.get("/getnotify/:useremail", getNotification)
NotificationRoute.put("/read/:_id", unRead)
NotificationRoute.delete("/delete/:_id", rejectNotification)
module.exports=NotificationRoute