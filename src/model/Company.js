const mongoose = require('mongoose')

const Company = mongoose.model("companies",
new mongoose.Schema({
    companyname:{
        type:String,
        required:true,
        unique:true,
    },
    useremail:{
        type:String,
        required:true,
    },
    companyemail:{
        type:String,
        required:true,
        unique:true,
    },
    companylocation:{
        type:String,
        required:true,
    },
    profileimgae:{
        type:String,
    },
    network:{
        type:Array,
        default:[]
    }
},{timestamps:true}))

module.exports=Company;