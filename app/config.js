var config = module.exports;
var PRODUCTION = process.env.NODE_ENV === 'production';

config.cookieSecret = config.sessionSecret = 'WE ARE IMPERO';

config.express = {
  port: process.env.EXPRESS_PORT || 3000,
  ip: '127.0.0.1'
};

config.mongodb = {
  port: process.env.MONGODB_PORT || 27017,
  host: process.env.MONGODB_HOST || 'localhost',
  dbname: process.env.MONGODB_NAME || 'impdb'
};

if (PRODUCTION) {
  // ...
}
