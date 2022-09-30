
const mongoose = require('mongoose');
const  mongodbErrorHandler = require('mongoose-mongodb-errors')

const mongoURI =`mongodb+srv://${process.env.DB_USRENAME}:${process.env.DB_PASSWORD}@cluster0.yjyvevx.mongodb.net/${process.env.DATABASENAME}?retryWrites=true&w=majority`


mongoose.Promise = global.Promise;
mongoose.plugin(mongodbErrorHandler);

mongoose.connect(
    mongoURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then((db) => console.log("Connected to MongoDB..."))
  .catch((err) => {
    console.error("could not connect to database." + err.message);
    process.exit(1);
  });

module.exports =mongoose