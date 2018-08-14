const mongoose = require('mongoose');

const keys = require('./keys');

mongoose.connect(keys.MONGODB_URI,{useNewUrlParser : true},()=>{
  console.log('connected to mongoDB');
})