const User = require('../model/Usermodel')

//get all user
const getAllUser = async (req,res)=>{
    try{
      const users= await User.find()
      if(users){
        res.status(200).json({isSuccess:"true",message:"",result:users}) 
    }
       else{
        res.status(400).json({isSuccess:"false",message:"Something Went Wrong",result:[]})
       }
    }
    catch(err){
        res.status(500).json({isSuccess:"false",message:err.message,result:[]})
       }
}

//get individual user

const getbyId = async (req,res)=>{
    try{
        const users= await User.findById({_id:req.params._id})
        if(users){
          res.status(200).json({isSuccess:"true",message:"",result:users}) 
      }
         else{
          res.status(400).json({isSuccess:"false",message:"Something Went Wrong",result:[]})
         }
      }
      catch(err){
          res.status(500).json({isSuccess:"false",message:err.message,result:[]})
         }
}

//update user


const updateUser = async (req,res)=>{
    try{
        const users= await User.findById({_id:req.params._id})
        if(users){ 
            const updateuser = await User.findOneAndUpdate({email:users.email},req.body,{new:true})
            if(updateuser){
                res.status(200).json({isSuccess:"true",message:"Updated successfully",result:updateuser}) 
            }else{
                res.status(400).json({isSuccess:"false",message:"Something Went Wrong",result:[]})
               }
            
        }
        
    }
    catch(err){
        res.status(500).json({isSuccess:"false",message:err.message,result:[]})
       }
}

module.exports={
    getAllUser,
    getbyId,
    updateUser
}