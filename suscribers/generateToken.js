const jwt =require('jsonwebtoken')

//Generate a A token
module.exports =(data)=>{
     return jwt.sign({
        _id:data.id,
        email:data.email
     },process.env.SECRETKEY,{
        expiresIn: 60 * 60 
     })
}