const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

//config
require('./configs/mongodb-config');
require('./configs/auth-serialize-config');

const keys = require('./configs/keys');

const app = express();
app.use(cors({
  origin : [keys.FRONTEND_URL],
  credentials : true
}));
//app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(session({secret:keys.SESSION_SECRET,cookie:{maxAge:15*24*60*60*1000}}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/profile',require('./api/profile-api'));

app.listen(keys.BACKEND_PORT,()=>{
  console.log(`app is listening on port ${keys.BACKEND_PORT}`);
});

module.exports = app;