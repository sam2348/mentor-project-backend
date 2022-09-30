require('dotenv').config({path:'./config/config.env'})
const app =require('./app')
// conecting the DataBase
const db=require('./db/db')





// starting the server
app.listen(process.env.PORT,()=>{
    console.log(`server started on PORT:${process.env.PORT} `)
})