const route = require('express').Router();
const passport = require('passport');

const keys = require('../configs/keys');

if(keys.NODE_ENV === 'test'){
  throw Error('Unexpected test env');
}
route.get('/google',passport.authenticate('google',{scope:['profile','email']}));
route.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
  res.redirect(keys.FRONTEND_URL);
})

module.exports = route;