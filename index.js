const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const multer= require('multer')
const bodyParser = require('body-parser')
const path = require('path')
require('dotenv').config()


const app=express()
app.use(bodyParser.json())
//cors origin setup
app.use(cors())

  
//static folder
app.use(express.static(path.join(__dirname,'public')));
app.use('/image',express.static("./image"))

//AuthRoute Middleware
const auth=require('./src/routes/AuthRoute')
app.use("/api",auth)

//CompanyRoute Middleware
const company=require('./src/routes/CompanyRoute')
app.use("/api",company)

//Notification Middleware
const notification=require('./src/routes/NotificationRoute')
app.use("/api",notification)
//UserRoute Middleware
const user=require('./src/routes/UserRoute')

app.use("/api",user)

//multer configuration
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./image")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
    
})

let maxSize= 2*1000*1000;

const upload=multer({storage:storage,limits:{fieldSize:maxSize}});
//image upload api
app.post('/api/upload',upload.single("img"),(req,res)=>{
    res.status(200).json({statuscode:"200",isSuccess:"true",message:"image uploades sucessfully",result:req.file})
})



//DB Connection 
mongoose.connect(process.env.MongoDB_URL).then(()=>{
    console.log("DB Connected SuccessFully")
}).catch((err)=>{
    console.log(err.message)
})

module.exports = app;