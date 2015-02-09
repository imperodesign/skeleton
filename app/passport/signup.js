var LocalStrategy = require('passport-local').Strategy
 	, User = require('../models/user')
	, bCrypt = require('bcrypt-nodejs')
	, debug = require('debug')('skeleton-passport');

module.exports = function(passport) {

	passport.use('signup', new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true // allows us to pass back the entire request to the callback
		},
		function(req, email, password, done) {

			findOrCreateUser = function() {
				// find a user in Mongo with provided email
				User.findOne({
					'email': email
				}, function(err, user) {
					// In case of any error, return using the done method
					if (err) {
						debug('Error in SignUp: ' + err);
						return done(err);
					}
					// already exists
					if (user) {
						debug('User already exists with email: ' + email);
						return done(null, false, req.flash('message', 'User Already Exists'));
					} else {
						// check if there is no user with this email
						// then create the user
						var newUser = new User();

						// set the user's local credentials
						newUser.email = email;
						newUser.password = createHash(password);
						// newUser.email = req.param('email');
						newUser.firstName = req.param('firstName');
						newUser.lastName = req.param('lastName');

						// save the user
						newUser.save(function(err) {
							if (err) {
								debug('Error in Saving user: ' + err);
								throw err;
							}
							debug('User Registration succesful');
							return done(null, newUser);
						});
					}
				});
			};
			// Delay the execution of findOrCreateUser and execute the method
			// in the next tick of the event loop
			process.nextTick(findOrCreateUser);
		}));

	// Generates hash using bCrypt
	var createHash = function(password) {
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	}

}
