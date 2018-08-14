const route = require('express').Router();

const keys = require('../configs/keys');
const {FRONTEND_URL} = keys;

if(keys.NODE_ENV !== 'test'){
  throw Error(`Unexpected ${keys.NODE_ENV} env`);
}

route.get('/dummy_login_for_test_purpose',async (req,res)=>{
  const User =  require('../models/user');
  const {email,name} = req.query;
  try{
    const user = await User.findOneOrCreate(email,name);
    req.login(user,(err)=>{
      if(err){
        console.log(err);
        res.status(500).send();
      }else{
        return res.redirect(FRONTEND_URL);
      }
    });
  }catch(e){
    console.log(e);
    res.status(500).send();
  }
});

module.exports = route;