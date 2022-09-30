const jwt =require('jsonwebtoken')
const Error =require('../utils/ErrorHandler')

module.exports =(req,res,next)=>{
  const token = req.headers.authorization
  if(!token) return next(new Error('Authenticatin failed'))

  const decoded= jwt.verify(token.split(" ")[1],process.env.SECRETKEY)
    req.data =decoded

    next()
}