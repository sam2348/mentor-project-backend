const express = require("express");
const app = express();
const Error=require('./utils/ErrorHandler')
const GloBalErrorHandler =require('./middleware/Error')
const EmployeeRoutes =require('./api-routes/Employee-route/Employee-routes')
const CompanyRoutes =require('./api-routes/Company-routes/Company-routes')
const AdminRoutes =require('./api-routes/Admin-routes/admin-routes')
const morgan =require('morgan')

var cors = require('cors');
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
// adding morgan to log HTTP requests
app.use(morgan('dev'))

// Hand The employee-routes
app.use('/employee/accounts',EmployeeRoutes)
app.use('/company/accounts',CompanyRoutes)
app.use('/api/v1/admin/accounts',AdminRoutes)

// Page Not Found Error
app.use('*',(req,res,next)=>{
    next(new Error(`can't find ${req.originalUrl} on this server`,404))
})

// Global Error Handler
app.use(GloBalErrorHandler)


module.exports =app
