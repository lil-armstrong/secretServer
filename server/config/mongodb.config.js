const mongoose = require('mongoose');
require('dotenv').config();

// Replace the uri string with your MongoDB deployment's connection string.
const db_username = process.env.DB_USER || 'admin';
const db_password = process.env.DB_PASSWORD || 'secretServer';
const db_name = process.env.DB_NAME || 'secrets';
let uri = "mongodb+srv://<user>:<password>@aws-cluster.hzdzv.mongodb.net/<dbname>?retryWrites=true&w=majority";
uri = uri.replace(/\<user\>/, db_username).replace(/\<password\>/, db_password).replace(/\<dbname\>/, db_name);

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then((connection)=> {
  console.log('MongoDB Database connection succeeded!');
  if (process.env.NODE_DEBUG) {
    console.log(err)
  }})
.catch(err=> {
  console.error('MongoDB database connection failed. Please check your network settings');
  if (process.env.NODE_DEBUG) {
    console.log(err)
  }
});
module.exports = mongoose.connection