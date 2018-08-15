const app = require('./app-share-no-auth');
const keys = require('./configs/keys');

if(keys.NODE_ENV === 'production'){
  throw Error('Unexpect product env');
}
app.use('/auth',require('./api/auth-api-test-dev-env'));

module.exports = app;