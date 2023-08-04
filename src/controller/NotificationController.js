const Notification = require('../model/Notification')

const generateNotification = async (req,res)=>{
    try{
        const notification = new Notification({
            useremail:req.body.useremail,
            message:req.body.message,
            type:req.body.type,
            sender:req.body.sender
        })
        await  notification.save()
        res.status(200).json({statuscode:"200",isSuccess:"true",message:"notification sent",result:notification})
    }
    catch(err){
        res.status(200).json({statuscode:"400",isSuccess:"false",message:err.message,result:[]})
    }
    
}
const getNotification = async (req,res)=>{
    try{
        const mysort ={createdAt:-1}
        const notify = await Notification.find({useremail:req.params.useremail}).sort(mysort)
        if(notify){
            res.status(200).json({statuscode:"200",isSuccess:"true",message:"",result:notify})
        }else{
            res.status(200).json({statuscode:"400",isSuccess:"false",message:"something went wrong",result:[]})
        }
    }
    catch(err){
        res.status(200).json({statuscode:"400",isSuccess:"false",message:err.message,result:[]})
    }
}
// Unread message 
const unRead = async (req,res) =>{
   try{
     const message = await Notification.findOne({_id:req.params._id})
     if(message){
        const updateread = await Notification.findByIdAndUpdate({_id:message._id},{$set:{read:"read"}},{new:true})
        res.status(200).json({statuscode:"200",isSuccess:"true",message:"updated",result:updateread})
    }else{
        res.status(200).json({statuscode:"400",isSuccess:"false",message:"something went wrong",result:[]})
    }
}
catch(err){
    res.status(200).json({statuscode:"400",isSuccess:"false",message:err.message,result:[]})
}
}
//Reaject 
const rejectNotification = async (req,res) =>{
    try{
        const deletenotification = await Notification.findByIdAndDelete({_id:req.params._id})
    if(deletenotification){

       res.status(200).json({statuscode:"200",isSuccess:"true",message:"updrejected",result:deletenotification})
    }else{
        res.status(200).json({statuscode:"400",isSuccess:"false",message:"something went wrong",result:[]})
    }
}
catch(err){
    res.status(200).json({statuscode:"400",isSuccess:"false",message:err.message,result:[]})
}
    
}
    

module.exports={
    generateNotification ,
    getNotification,
    unRead,
    rejectNotification
}