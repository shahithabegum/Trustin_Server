const bcrypt = require('bcrypt')

const hasspassword = async (password)=>{
   const salt = await bcrypt.genSalt(10)
   const hasspass = await bcrypt.hash(password,salt)
   return hasspass
}

const verifypassword = async(password,encrptedpassword)=>{
    const verify = await bcrypt.compare(password,encrptedpassword)
    return verify
}
module.exports= {
    hasspassword,
    verifypassword
}