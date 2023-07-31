const User = require('../model/Usermodel')
const {hasspassword,verifypassword} =require('../passwordEncrypt')
const randomstring = require('randomstring')
require('dotenv/config')
const nodemailer=require('nodemailer')
const JWT=require('jsonwebtoken')
//signUp Method
const signUp = async (req,res)=>{
    try{
        const ExistingUser = await User.findOne({email:req.body.email})
        const encrypt_password=await hasspassword(req.body.password)
        if(! ExistingUser){
            const Newuser = new User({
                username:req.body.username,
                email:req.body.email,
                phoneno:req.body.phoneno,
                profileimg:req.body.profileimg,
                password:encrypt_password
            })
            await Newuser.save()
            res.status(200).json({isSuccess:"true",message:"",result:Newuser})
        }
        else{
            res.status(400).json({isSuccess:"false",message:"User Already Exist",result:[]})
        }
    }
    catch(err){
     res.status(500).json({isSuccess:"false",message:err.message,result:[]})
    }
   
}

//Login Method 
const login = async (req,res)=>{
    try{
        const ExistingUser = await User.findOne({email:req.body.email})
        if(ExistingUser){
            const comparepassword= await verifypassword(req.body.password,ExistingUser.password)
            
           if(comparepassword ){ 
            let token = JWT.sign({...ExistingUser.toJSON()},process.env.TOKEN_SECRET,{expiresIn:'7d'})
            
            res.status(200).json({isSuccess:"true",message:"Login Successfull",result:{ExistingUser,token:token}}) 
            }
         else
         { res.status(400).json({isSuccess:"false",errorMessage:"UserName Or Password Incorrect",result:[]})}
        }
        else{
            res.status(400).json({isSuccess:"false",message:"User Dose Not Exist",result:[]})
        }
    } 
    catch(err){
        res.status(500).json({isSuccess:"false",message:err.message,result:[]})
       }
    
}
//forgotpassword mail
const forgotpasswordmail= async(email,token)=>{
    const transpoter=nodemailer.createTransport({
       host:"smtp.ethereal.email",
       port:587,
       secure:false,
       requireTLS:true,
       auth:{
           user:process.env.Email_User,
           pass:process.env.Email_Password
       }
    })
    const mailoption ={
       from:process.env.Email_User,
       to:email,
       subject:"Password Reset",
       html:`<!DOCTYPE html>
       <html lang="en">
       <head>
           <meta charset="UTF-8">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <title>Document</title>
       </head>
       <body>
           <div style="margin:0 auto;width:70% ;padding:10px">
           <h1 style="text-align: center;">Password Reset</h1>
           <p style="font-size: 16px;text-align: center;">If you've lost your password or wish to reset it,use the link below to get started </p>
            <button Style="width:max-content;padding:10px;background-color:blue;margin-left:40%;border:none"> <a href="http://localhost:3000/resetpassword?token=`+token+`" style="text-decoration: none;color:white">Reset Your Passwotd</a></button>
           <p style="font-size: 16px;text-align: center;">if you did not request a password reset,you can safely ignore this email. Only a person with access to your email can reset your account password.</P>
           </div>    
       </body>
       </html>`
    }
    transpoter.sendMail(mailoption,(err,info)=>{
       if(err){
           console.log(err.message)
       }
       else{
           console.log(info.response)
       }
    })
   }
   
   //forgotpassword logic
   const forgotPassword = async (req,res)=>{
       try{
           const userData=await User.findOne({email:req.body.email})
           if(!userData){
               res.status(200).json({isSuccess:"false",message:"User dose not exist",result:[]})
           }
           else{
               const Randomstring = randomstring.generate();
               const user= await User.findOneAndUpdate({email:req.body.email},{$set:{token:Randomstring}},{new:true})
                forgotpasswordmail(userData.email,Randomstring)
               res.status(400).json({isSuccess:"true",message:"please check your mail inbox",result:{user:user}})
           }
       }catch(err){
           res.status(400).json({isSuccess:"false",message:error.message,result:[]})
       }
   }
   
   //resetpassword mail
   const resetPassword = async (req,res)=>{
       try{
           const tokenData=req.body.token;
           const tokencheck= await User.findOne({token:tokenData})
          if( tokencheck) {
           const password=req.body.password
           const hasspass =await hasspassword(password)
               const newpassword =await User.findByIdAndUpdate({_id:tokencheck._id},{$set:{password:hasspass,token:''}},{new:true})
               res.status(200).json({statuscode:"200",isSuccess:"true",message:"Password has been reset successfully",result:{user:newpassword}})
           }
           else{
               res.status(200).json({statuscode:"400",isSuccess:"false",message:"This Link has been expried.....!",result:[]})
           }
       }catch(err){
           res.status(200).json({statuscode:"400",isSuccess:"false",message:"user dose not exits....!",result:[]})
       }
   }
   
module.exports={
    signUp,
    login,
    forgotPassword,
    resetPassword

}