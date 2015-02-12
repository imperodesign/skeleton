var config = module.exports;

var PRODUCTION = process.env.NODE_ENV === 'production';

config.cookieSecret = config.sessionSecret = 'WE ARE IMPERO';

config.express = {
	port: process.env.EXPRESS_PORT || 3000,
};

config.passport = {
	sendEmailWhen: {
		signup: true,
		login: true
	},
	tokenValidity: 86400000 // 24H
}

config.mailServices = {
	mandrill: {
		apiKey: '3Bk24wRJhEAp4fA2iqI2Ew' // impero-skeleton api key
	}
}

config.mongodb = {
	url : 'mongodb://localhost:27017/impdb'
};

if (PRODUCTION) {
	// ...
}
