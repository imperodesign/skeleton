var express = require('express');
var router = express.Router();

module.exports = function(passport) {

	var siteCtrl = require('../controllers/site')();
	var usersCtrl = require('../controllers/users')(passport);

	router.get('/login', usersCtrl.getLogin);

	router.post('/login', passport.authenticate('login', {
		successRedirect: '/dashboard',
		failureRedirect: '/users/login',
		failureFlash : true
	}));

	router.get('/signup', usersCtrl.getSignup);

	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/dashboard',
		failureRedirect: '/users/signup',
		failureFlash : true
	}));

	router.get('/signout', usersCtrl.getSignout);

	return router;
}
