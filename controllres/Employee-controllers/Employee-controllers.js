const Employee = require("../../models/User/EmployeeSchema");
const Error = require("../../utils/ErrorHandler");
const generateToken = require("../../suscribers/generateToken");

// Adding new Employee (Sign-Up Controller)

exports.EmployeeSignup = (req, res, next) => {
  console.log(req.body,"signup data")
  // taking a user
  const employee = req.body;

  //Comparing The Password and confirmpassowrd
  if (req.body.password != req.body.confirmpassowrd)
    return next(new Error("password not match", 400));

  //check The Existing user
  Employee.findOne({ email: req.body.email }, (err, emp) => {
    // if(emp) return res.status(400).json({ auth : false, message :"email exits"});
    if (emp) return next(new Error("user with given email already exist!", 400));

    // new Employee Object
    const employeedata = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      confirmpassowrd: req.body.confirmpassowrd,
    };
    console.log(employeedata,"employeedata")
    const new_employee = new Employee(employeedata);
    // save the New Emplyee from dataBase
    new_employee.save((err, doc) => {
      if (err) {
        console.log(err);
        return next(new Error(`${err.message}`, 400));
      }
      res.status(200).json({
        succes: true,
        new_employee: doc,
      });
    });
  });
};



//Emplyee Login Controllers
exports.EmployeeLogin = async (req, res, next) => {
  // taking a user
  const employee = req.body;

  Employee.findOne({ email: employee.email }, async function (err, employee) {
    // email is no valid
    if (!employee)
      return next(
        new Error(
          `The email address you entered isn't connected to an account. Please  Create a new account.`,
          400
        )
      );

    const isMatch = await employee.comparepassword(req.body.password);
    // password does not match
    if (!isMatch) return next(new Error("Invaid credentials", 400));

    //Match The password  then
    //Generate a Token
    const token = generateToken(employee);

    res.status(200).json({
      message: "Login SucessFully",
      _Id: employee._id,
      name: employee.firstName + " " + employee.lastName,
      email: employee.email,
      token: token,
    });
  });
};


//Add Profile 
exports.AddEmployeeProfile =(req,res,next)=>{
    const employeedata=req.body

    Employee.findOne({ email:req.data.email }, async function (err, employee) {
        const UpdateData ={
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.data.email,
            PhoneNumber:req.body.PhoneNumber,
            avatar:req.body.avatar,
            Qualification:req.body.qualification,
            skill:req.body.skill,
            Experience:req.body.experience,
            Bio:req.body.bio
        }
        console.log(UpdateData)
             Employee.updateOne({email:req.data.email},{$set:UpdateData},function(err,empdata){
                 console.log(err)
                 if(err) return next(new Error("Profile is not Added",501))
                 res.status(201).json({
                     "message":"Proile is Added",
                     empdata
                 })
             })
    })
}


//Get Profile Details
exports.GetEmployeeProfileDetails=(req,res,next)=>{
    Employee.findOne({ email:req.data.email }, async function (err, employee) {
         if(err) return next(new Error("connection failed",500))

         res.status(200).json({
            employee
         })
    })
}


//Update Employee Profile details
exports.UpdateEmployeeProfileDetails =(req,res,next)=>{
    const employeedata=req.body

    Employee.findOne({ email:req.data.email }, async function (err, employee) {
        const UpdateData ={
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.data.email,
            PhoneNumber:req.body.PhoneNumber,
            avatar:req.body.avatar,
            Qualification:req.body.qualification,
            skill:req.body.skill,
            Experience:req.body.experience,
            Bio:req.body.bio
        }
        console.log(UpdateData)
             Employee.updateOne({email:req.data.email},{$set:UpdateData},function(err,empdata){
                 console.log(err)
                 if(err) return next(new Error("Profile is not Added",501))
                 res.status(201).json({
                     "message":"Proile is Added",
                     empdata
                 })
             })
    })
    
}