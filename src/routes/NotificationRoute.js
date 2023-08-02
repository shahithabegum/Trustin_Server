const express = require('express');
const NotificationRoute = express.Router();

const {generateNotification} = require('../controller/NotificationController')

NotificationRoute.post("/notification", generateNotification)

module.exports=NotificationRoute