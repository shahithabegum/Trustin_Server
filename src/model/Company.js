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
    companyemail:{
        type:String,
        required:true,
       
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
        default:[{companyname:{
            type:String
           },
           user:{
            type:String
           }}]
       
    }
},{timestamps:true}))

module.exports=Company;