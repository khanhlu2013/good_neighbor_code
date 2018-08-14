const app = require('./app-share-no-auth');
const keys = require('./configs/keys');

if(keys.NODE_ENV !== 'test'){
  throw Error(`Expect test env but get ${keys.NODE_ENV} env`)
}
app.use('/auth',require('./api/auth-api-test-env'));

module.exports = app;