const mongoose = require('mongoose')

const Notification = mongoose.model("notiication",
new mongoose.Schema({
    useremail:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    },
    type:{
        type:String,
        require:true
    }
},{
    timestamps:true
}))

module.exports=Notification