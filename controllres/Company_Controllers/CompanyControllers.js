const Company =require('../../models/Company/company-schema')
const Error =require('../../utils/ErrorHandler')
const generateToken =require('../../suscribers/generateToken')



exports.CreateAccont = (req, res, next) => {
  
  
    //Comparing The Password and confirmpassowrd
    if (req.body.password != req.body.confirmpassowrd)
      return next(new Error("password not match", 400));
  
    //check The Existing user
    Company.findOne({ email:req.body.email}, (err, emp) => {
      if (emp) return next(new Error("user with given email already exist!", 400));
  
      // new Employee Object
      const CompanyData = {
         CompanyName:req.body.Companyname,
         fullName:req.body.Ownername,
         companyType:req.body.type,
         Desgination:[req.body.Desgination],
         email:req.body.email,
         DomainName:req.body.domainName,
         password:req.body.password,
         confirmpassowrd:req.body.confirmpassowrd
      };
  
      const New_company = new Company(CompanyData);
      // save the New Emplyee from dataBase
      New_company .save((err, doc) => {
        if (err) {
          console.log(err);
          return next(new Error(`${err.message}`, 400));
        }
        res.status(200).json({
          succes: true,
          New_company: doc,
        });
      });
    });
  };



  exports.CompanyLogin = async (req, res, next) => {

  
    Company.findOne({email:req.body.email}, async function (err, cmpy) {
      // email is no valid
      if (!cmpy)
        return next(
          new Error(
            `The email address you entered isn't connected to an account. Please  Create a new account.`,
            400
          )
        );
      const isMatch = await cmpy.comparepassword(req.body.password);
      // password does not match
      if (!isMatch) return next(new Error("Invaid credentials", 400));
  
      //Match The password  then
      //Generate a Token
      const token = generateToken(cmpy);
  
      res.status(200).json({
        message: "Login SucessFully",
        _Id: cmpy._id,
        CompanyName:cmpy.CompanyName,
        email:cmpy.officialemail,
         token:token
      });
    });
  };



 exports.UpgradeCompleProfile =(req,res,next)=>{
  Company.findOne({email:req.data.email }, async function (err, cmp) {
      const UpdateData ={
          CompanyName:cmp.CompanyName,
          fullName:cmp.fullName,
          companyType:cmp.companyType,
          Desgination:[cmp.Desgination],
          email:cmp.email,
          DomainName:req.body.DomainName,
          Company_PhoneNumer:req.body.PhoneNumber,
          Company_Logo:req.body.logo,
          Company_Address:req.body.Address,
          Company_WebsitUrl:req.body.url,
          Industries:req.body.industries,
          Companysize:req.body.Companysize,
          Headquarters:req.body.Headquarters,
          Founded:req.body.Founded
      }
      Company.updateOne({email:req.data.email},{$set:UpdateData},function(err,cmpdata){
               if(err) return next(new Error("Profile is not Added",501))
               res.status(201).json({
                   "message":"Proile is Added",
                   cmpdata
               })
           })
  })
 }




 exports.getProfile =(req,res,next)=>{
    Company.findOne({email:req.data.email }, async function (err, cmp) {
        if(err) return next(new Error("connection failed",500))
        res.status(200).json({
            cmp
        })
    })
 }


 exports.UpgradeProfile =(req,res,next)=>{
    Company.findOne({email:req.data.email }, async function (err, cmp) {
        const UpdateData ={
            CompanyName:cmp.CompanyName,
            fullName:cmp.fullName,
            companyType:cmp.companyType,
            Desgination:[cmp.Desgination],
            email:cmp.email,
            DomainName:req.body.DomainName,
            Company_PhoneNumer:req.body.PhoneNumber,
            Company_Logo:req.body.logo,
            Company_Address:req.body.Address,
            Company_WebsitUrl:req.body.url,
            Industries:req.body.industries,
            Companysize:req.body.Companysize,
            Headquarters:req.body.Headquarters,
            Founded:req.body.Founded
        }
        Company.updateOne({email:req.data.email},{$set:UpdateData},function(err,cmpdata){
                 if(err) return next(new Error("Profile is not Added",501))
                 res.status(201).json({
                     "message":"Proile is Added",
                     cmpdata
                 })
             })
    })
   }

