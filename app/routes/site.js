var express = require('express');
var router = express.Router();

module.exports = function(passport) {

	var siteCtrl = require('../controllers/site')();
	var usersCtrl = require('../controllers/users')(passport);

	router.get('/', siteCtrl.home);
	router.get('/dashboard', usersCtrl.isAuthenticated, siteCtrl.dashboard);

	return router;
}
