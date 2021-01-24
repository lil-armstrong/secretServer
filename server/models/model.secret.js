const mongoose = require('mongoose');
const moment = require('moment')

const {Schema, model} = mongoose;

const secretSchema = new Schema({
  hash:{
    type: String,
    required: true,
  },
  secretText:{
    type:String,
    required: true
  },
  expiresAt:{
    type: Date,
    default: moment().add(3600, 'seconds')
  },
  remainingViews: {
    type: Number,
    required: true,
    default: 10
  }
}, {
  collection:'secrets',
  timestamps: true
})

secretSchema.index({'expiresAt':1}, {expireAfterSeconds: 0});

const secretModel = new model('secret', secretSchema);

module.exports = secretModel