require("dotenv/config")
const app = require("./index")
//port setup
const PORT=process.env.PORT||8081

//server setup
app.listen(PORT,()=>{
   
        console.log(`server Running in ${PORT}`)
   
})