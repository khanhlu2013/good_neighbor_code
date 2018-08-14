const app = require('./app-share-no-auth');
const keys = require('./configs/keys');

if(keys.NODE_ENV === 'test'){
  throw Error('Unexpect test env');
}

require('./configs/passport-config');
app.use('/auth',require('./api/auth-api'));

module.exports = app;