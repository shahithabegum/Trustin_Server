const mongoose = require('mongoose')

const User = mongoose.model("user",
new mongoose.Schema({
    username:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
    },
    phoneno:{
        type:String,
        required:true,
    },
    profileimg:{
        type:String
    },
    password:{
        type:String,
        required:true,
    },
    newuser:{
        type:String,
        default:"true"
    },
    token:{
        type:String
    },
    authtoken:{
        type:String
    }
},{timestamps:true}))

module.exports = User