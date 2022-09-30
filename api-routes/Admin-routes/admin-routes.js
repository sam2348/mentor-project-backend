const express = require('express');
const  router =express.Router()
const AdminControllers=require('../../controllres/Admin-Controllers/Admin-controller');



router
     .route('/signup')
     .post(AdminControllers.CreateAccont)


router
      .route('/login')
      .post(AdminControllers.Login)  
      
      
 module.exports =  router   
