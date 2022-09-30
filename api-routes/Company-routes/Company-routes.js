const express = require('express');
const CompanyController=require('../../controllres/Company_Controllers/CompanyControllers')
const PrivateRoute =require('../../middleware/protectedroute')
const  router =express.Router()




// Company SignUp-route     
router
        .route('/signup')
        .post(CompanyController.CreateAccont)


// Company Login-route        
router
        .route('/login')
        .post(CompanyController.CompanyLogin) 



// Company Profile Routes

router
      .route('/profile')  
      .put(PrivateRoute,CompanyController.UpgradeCompleProfile)  
      .get(PrivateRoute,CompanyController.getProfile)
      .patch(PrivateRoute,CompanyController.UpgradeProfile)    









module.exports = router      