const mongoose = require("mongoose");
const bcrypt = require("bcrypt");



const AdminSchema = new mongoose.Schema({
    name:{
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
})



AdminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(this.password, salt);
  
    this.password = hashed;
    this.confirmpassowrd = undefined;
  });
  
  
  AdminSchema.methods.comparepassword=async function(password){
    return await bcrypt.compare(password,this.password)
  }
  
  
  const Admin = mongoose.model("Admin", AdminSchema);
  
  module.exports=Admin