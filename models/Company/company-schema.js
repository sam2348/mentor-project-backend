const mongoose = require("mongoose");
const bcrypt = require("bcrypt");





const CompanyShema = new mongoose.Schema(
    {
      CompanyName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minLength: 2,
        match:[
          /^[a-zA-Z ]{2,30}$/,
          "please fill a valid firstName"
        ]
      },
      fullName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minLength: 2,
        match:[
          /^[a-zA-Z ]{2,30}$/,
          "please fill a valid firstName"
        ]
      },
      DomainName:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },
      email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [
          /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/,
          "Please fill a valid email address",
        ],
      },
      companyType:{
        type: String,
        required: true,
      },
      Desgination:[
      
      ],
      Company_PhoneNumer:{
        type: Number,
        min: 9,
        max: 10,
        match:[
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
          "Please Fill the valid Phone Number"
        ]
      },
      Company_Logo:{
        type: String,
      },
      Company_Address:{
        type: String,
        match:[
          /^[a-zA-Z ]{2,400}$/,
          "please fill a valid firstName"
        ]
      },
      Company_WebsitUrl:{
        type: String,
        match:[
          /^[a-zA-Z ]{2,70}$/,
          "please fill a valid Company_WebsitUrl"
        ]
      },
      Industries:{
        type: String,
        match:[
          /^[a-zA-Z ]{2,70}$/,
          "please fill a valid Industries"
        ]
      },
      Companysize:{
        type: String, 
      },
      Headquarters:{
        type: String, 
        match:[
          /^[a-zA-Z ]{2,70}$/,
          "please fill a valid Industries"
        ]
      },
      Founded:{
        type: Number, 
        match:[
          /^[0-9]{1,70}$/,
          "please fill a valid Company_Size"
        ]
      },
      password: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 50,
        match:[
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,10}$/,
          "Please fill a strong Password "
      ]
      },
      confirmpassowrd: {
        type: String,
        required: true,
        trim: true,
        minLength: 8,
        maxLength: 50,
        validate: function () {
          return this.confirmpassowrd === this.password;
        },
        match:[
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,10}$/,
          "Please fill a strong Password "
      ]
      },
      accountCreated: {
        type: Date,
        default: Date.now,
      },
    },
  );
  
  CompanyShema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(this.password, salt);
  
    this.password = hashed;
    this.confirmpassowrd = undefined;
  });
  
  
  CompanyShema.methods.comparepassword=async function(password){
    return await bcrypt.compare(password,this.password)
  }
  
  
  const Company = mongoose.model("Company", CompanyShema);
  
  module.exports=Company