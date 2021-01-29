const mongoose = require('mongoose');
require('dotenv').config();

// Replace the uri string with your MongoDB deployment's connection string.
const db_username = process.env.DB_USER || 'admin';
const db_password = process.env.DB_PASSWORD || 'secretServer';
const db_name = process.env.DB_NAME || 'secrets';

let uri = `mongodb+srv://${db_username}:${db_password}@aws-cluster.hzdzv.mongodb.net/${db_name}?retryWrites=true&w=majority`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}

// mongoose.connect(uri, options);

module.exports = { mongoose, uri, options }