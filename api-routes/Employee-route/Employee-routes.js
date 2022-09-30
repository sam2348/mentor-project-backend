const express = require('express');
const EmployeeControllre =require('../../controllres/Employee-controllers/Employee-controllers')
const ProtectRoute =require('../../middleware/protectedroute')

const  router =express.Router()


// Adding new Employee (Sign-Up Route)
router
        .route('/signup')
        .post(EmployeeControllre.EmployeeSignup)


// Employee Login-route        
router
        .route('/login')
        .post(EmployeeControllre.EmployeeLogin)  


// Add Employee Profile Details
router
      .route('/profile')
      .put(ProtectRoute,EmployeeControllre.AddEmployeeProfile)                  //Add Employee Profile Details
      .get(ProtectRoute,EmployeeControllre.GetEmployeeProfileDetails)          //Get Employee Profile Details
      .patch(ProtectRoute,EmployeeControllre.UpdateEmployeeProfileDetails)    // Update Employee Profile Details
      
 
        
        





module.exports = router      