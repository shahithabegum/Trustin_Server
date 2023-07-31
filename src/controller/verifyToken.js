const JWT = require ('jsonwebtoken')
require('dotenv').config()
const authToken = (req,res,next)=>{
    JWT.verify(
        req.headers["x-access-token"],
        process.env.TOKEN_SECRET,
        function(err,decoded){
            if(err){
                res.status(200).json({isSccess:'false',message:"Accessdeine"+err.message})
            }
            else{
                req.currentUser=decoded;
            next()
            }
        }
    )
}
module.exports={authToken};