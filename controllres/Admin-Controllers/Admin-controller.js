const Admin =require('../../models/Admin/admin-schema')
const Error =require('../../utils/ErrorHandler')
const generateToken =require('../../suscribers/generateToken')





exports.CreateAccont = (req, res, next) => {
  
  
    //Comparing The Password and confirmpassowrd
    if (req.body.password != req.body.confirmpassowrd)
      return next(new Error("password not match", 400));
  
    //check The Existing user
    Admin.findOne({ email:req.body.email}, (err, emp) => {
      if (emp) return next(new Error("user with given email already exist!", 400));
  
    
      const admin = new Admin(req.body);
      // save the New Emplyee from dataBase
      admin .save((err, doc) => {
        if (err) {
          console.log(err);
          return next(new Error(`${err.message}`, 400));
        }
        res.status(200).json({
          succes: true,
          admin:admin
        });
      });
    });
  };






  exports.Login = async (req, res, next) => {
    Admin.findOne({email:req.body.email}, async function (err, admin) {
      // email is no valid
      if (!admin)
        return next(
          new Error(
            `The email address you entered isn't connected to an account. Please  Create a new account.`,
            400
          )
        );
      const isMatch = await admin.comparepassword(req.body.password);
      // password does not match
      if (!isMatch) return next(new Error("Invaid credentials", 400));
  
      //Match The password  then
      //Generate a Token
      const token = generateToken(admin);
  
      res.status(200).json({
        message: "Login SucessFully",
        _Id: admin._id,
        name:admin.name,
        email:admin.email,
         token:token
      });
    });
  };