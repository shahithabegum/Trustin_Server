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
                    companyemail:req.body.companyemail,
                    profileimgae:req.body.profileimgae,
                    companylocation:req.body.companylocation
                })
               await NewProfile.save()
                res.status(200).json({isSuccess:"true",message:"Company profile Created successfully",result:NewProfile})
            }
            else{
                res.status(400).json({isSuccess:"flase",message:"User Already Belong to this company",result:[]})
            }
           

       
    }
    catch(err){
        res.status(400).json({isSuccess:"false",message:err.message,result:[]})
    }
}
// company drowp down
const getAll = async (req,res)=>{
    try{
        const companyList = await Company.find()
       if (companyList) {
        res.status(200).json({isSuccess:"true",message:"",result:companyList}) 
    }
       else{
        res.status(400).json({isSuccess:"false",message:"Something Went Wrong",result:[]})
       }
        
    }
    catch(err){
        res.status(400).json({isSuccess:"false",message:err.message,result:[]})
    }
}

//get company depands on user

const getByUser = async (req,res)=>{
    try{
    const companyCheck = await Company.findOne({useremail:req.params.useremail})
    companyCheck ? res.status(200).json({isSuccess:"true",message:"",result:companyCheck}) :
    res.status(400).json({isSuccess:"false",message:"Something Went Wrong",result:[]})
    }
    catch(err){
        res.status(400).json({isSuccess:"false",message:err.message,result:[]})
    }
}
module.exports={
    createCompanyprofile,
    getAll,
    getByUser
}
