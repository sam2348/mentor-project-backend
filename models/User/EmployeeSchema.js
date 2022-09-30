const mongoose = require("mongoose");
const bcrypt = require("bcrypt");



// EmployeeSchema All Field Schema with regex

const EmployeeSchema = new mongoose.Schema(
  {
    firstName: {
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
    lastName: {
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
    email: {
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
    PhoneNumber: {
      type: Number,
      min: 9,
      max: 10,
      match:[
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        "Please Fill the valid Phone Number"
      ]
    },
    avatar: {
      type: String,
    },
    Qualification: [],
    skill: [String],
    Experience: {
      type: Number,
      match:[
        /^[0-9]{0,2}$/,
        'Please fill the Valid Experience and Character is not allowed'
      ]
    },
    Bio: {
      type: String,
      minLength: 8,
      maxLength: 500,
      match:[
        /^[a-zA-Z0-9_\.\-]{8,500}$/,
        "please fill a valid firstName"
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
    isAccountVerified: {
      type: Boolean,
      default: true,
    },
    accountCreated: {
      type: Date,
      default: Date.now,
    },
  },
);

EmployeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(this.password, salt);

  this.password = hashed;
  this.confirmpassowrd = undefined;
});


EmployeeSchema.methods.comparepassword=async function(password){
  return await bcrypt.compare(password,this.password)
}


const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports=Employee