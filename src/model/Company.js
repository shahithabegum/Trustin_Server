const mongoose = require('mongoose')

const Company = mongoose.model("companies",
new mongoose.Schema({
    companyname:{
        type:String,
        required:true,
        
    },
    useremail:{
        type:String,
        required:true,
    },
    companywebsite:{
        type:String,
        required:true,
       
    },
    companylocation:{
        type:String,
        required:true,
    },
    profileimgae:{
        type:String,
        default:"image\\cover.jpg"
    },
    network:{
        type:Array,
        default:[]
    }
},{timestamps:true}))

module.exports=Company;