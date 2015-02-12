var LocalStrategy = require('passport-local').Strategy
 	, User = require('../models/user')
 	, bCrypt = require('bcrypt-nodejs')
	, async = require('async')
	, debug = require('debug')('skeleton-passport');

/*
var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, ObjectId = Schema.ObjectId;
*/

module.exports = function(passport) {

	passport.use('login', new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		},
		function(req, email, password, done) {
			// check in mongo if a user with email exists or not
			User.findOne({
					'email': email.toLowerCase()
				},
				function(err, user) {
					// In case of any error, return using the done method
					if (err) { return done(err); }

					// Email does not exist, log the error and redirect back
					if (!user) {
						debug('User Not Found with email ' + email);
						return done(null, false, req.flash('message', 'User Not found.'));
					}

					// User exists but wrong password, log the error
					if (!isValidPassword(user, password)) {
						debug('Invalid Password');
						return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
					}

					// User and password both match,
					// update last_login field into mongodb
					// then return done(null, user) which
					// will be treated like a success
					var _lastLogin = Date.now();

					async.series([
						function (cb) {
							User.update({ _id: user._id }, {
								$set: { lastLogin: _lastLogin }
							}, function(err, res) {
								if(err) {
									return cb(err);
								}
								return cb(null, { res: res, lastLogin: _lastLogin });
							});
						}
					], function(err, results) {
						if(err) {
							debug('Record not updated correctly');
							debug(err);
							return done(err);
						}

						if(results[0].res!==1) {
							debug('Record not updated correctly. Mongo return ' + results[0]).res;
							debug('Ignoring the update...');
						} else {
							debug('Record updated correctly');
							user.lastLogin = results[0].lastLogin;
						}

						return done(null, user);
					});
				}
			);

		}));

	var isValidPassword = function(user, password) {
		return bCrypt.compareSync(password, user.password);
	}

}
