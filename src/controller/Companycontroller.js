const Company = require ('../model/Company')
const User = require("../model/Usermodel")

//create Company profile
const createCompanyprofile = async (req,res)=>{
    try{
           
                const userCheck = await Company.findOne({useremail:req.body.useremail})
                 if(! userCheck){
                    const NewProfile = new Company({
                    companyname:req.body.companyname,
                    useremail:req.body.useremail,
                    companywebsite:req.body.companywebsite,
                    profileimgae:req.body.profileimgae,
                    companylocation:req.body.companylocation
                })
               await NewProfile.save()
                res.status(200).json({statuscode:"200",isSuccess:"true",message:"Company profile Created successfully",result:NewProfile})
               }
                 else{
                      res.status(200).json({statuscode:"400",isSuccess:"flase",message:`User Already Belong to ${userCheck.companyname}`,result:[]})
                 }
           
        }
           

       
    
    catch(err){
        res.status(200).json({statuscode:"400",isSuccess:"false",message:err.message,result:[]})
    }
}
// get All Company details
const getAll = async (req,res)=>{
    try{
        const companyList = await Company.find()
       if (companyList) {
        res.status(200).json({statuscode:"200",isSuccess:"true",message:"",result:companyList}) 
    }
       else{
        res.status(200).json({statuscode:"400",isSuccess:"false",message:"Something Went Wrong",result:[]})
       }
        
    }
    catch(err){
        res.status(200).json({statuscode:"400",isSuccess:"false",message:err.message,result:[]})
    }
}

//get company depands on user

const getByUser = async (req,res)=>{
    try{
    const companyCheck = await Company.findOne({useremail:req.params.useremail})
    companyCheck ? res.status(200).json({statuscode:"200",isSuccess:"true",message:"",result:companyCheck}) :
    res.status(200).json({statuscode:"400",isSuccess:"false",message:"Something Went Wrong",result:[]})
    }
    catch(err){
        res.status(200).json({statuscode:"400",isSuccess:"false",message:err.message,result:[]})
    }
}

//connect Company method
const connectCompany = async(req,res)=>{
    if(req.body.useremail !== req.params.useremail){
        try{
            const myaccount = await Company.findOne({useremail:req.body.useremail})
            const connectuser = await Company.findOne({useremail:req.params.useremail})
            let check = []
            const count = myaccount.network.filter((item)=>{
                console.log(item)
              if (item.user==req.params.useremail){
                check=item.user
              } 
            })
           console.log("check",check)
        
            if(check.length === 0){
                await connectuser.updateOne({$push:{network:{user:req.body.useremail,companyname:myaccount.companyname}}})
                await myaccount.updateOne({$push:{network:{user:req.params.useremail,companyname:connectuser.companyname}}})
                res.status(200).json({statuscode:"200",isSuccess:"true",message:"connection success",result:[]})
            }
            else{
                res.status(200).json({statuscode:"400",isSuccess:"false",message:"Already in your network",result:[]})
            }
           
        }
        catch(err){
            res.status(200).json({statuscode:"400",isSuccess:"false",message:err.message,result:[]})
        }
    }
    else{
        res.status(200).json({statuscode:"400",isSuccess:"false",message:"You Cannot Connect Your self",result:[]})
    }
    
}
//Update company
const Update_company = async(req,res)=>{
    try{
        const Check = await Company.findById({_id:req.params._id})
        if(Check){
            const update = await Company.findByIdAndUpdate({_id:req.params._id},req.body,{new:true})
            res.status(200).json({statuscode:"200",isSuccess:"true",message:"Updated success",result:update})
        }
        else{
            res.status(200).json({statuscode:"400",isSuccess:"false",message:"Something Went Wrong",result:[]})
        }
    }
    catch(err){
        res.status(200).json({statuscode:"400",isSuccess:"false",message:err.message,result:[]})
    }
}
module.exports={
    createCompanyprofile,
    getAll,
    getByUser,
    connectCompany,
    Update_company
}
