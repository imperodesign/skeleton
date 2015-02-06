var config = module.exports;

var PRODUCTION = process.env.NODE_ENV === 'production';

config.cookieSecret = config.sessionSecret = 'WE ARE IMPERO';

config.express = {
	port: process.env.EXPRESS_PORT || 3000,
};

config.mongodb = {
	url : 'mongodb://localhost:27017/impdb'
};

if (PRODUCTION) {
	// ...
}
