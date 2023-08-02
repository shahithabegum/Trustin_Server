const Notification = require('../model/Notification')

const generateNotification = async (req,res)=>{
    try{
        const notification = new Notification({
            useremail:req.body.useremail,
            message:req.body.message,
            type:req.body.type
        })
        await  notification.save()
        res.status(200).json({statuscode:"200",isSuccess:"true",message:"notification sent",result:notification})
    }
    catch(err){
        res.status(200).json({statuscode:"400",isSuccess:"false",message:err.message,result:[]})
    }
    
}

module.exports={
    generateNotification 
}