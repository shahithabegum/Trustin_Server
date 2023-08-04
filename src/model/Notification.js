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
    },
    read:{
        type:String,
       default:"unread"
    },
    sender:{
        type:String,
    }
},{
    timestamps:true
}))

module.exports=Notification