const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const multer= require('multer')
const bodyParser = require('body-parser')
require('dotenv').config()


const app=express()
app.use(bodyParser.json())
app.use(cors())

//AuthRoute Middleware
const auth=require('./src/routes/AuthRoute')
app.use("/api",auth)
//CompanyRoute Middleware
const company=require('./src/routes/CompanyRoute')
app.use("/api",company)
//UserRoute Middleware
const user=require('./src/routes/UserRoute')
app.use("/api",user)

//DB Connection 
mongoose.connect(process.env.MongoDB_URL).then(()=>{
    console.log("DB Connected SuccessFully")
}).catch((err)=>{
    console.log(err.message)
})

module.exports = app;