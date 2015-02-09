var login = require('./login')
  , signup = require('./signup')
  , User = require('../models/user')
  , debug = require('debug')('skeleton-passport');

module.exports = function(passport) {

  // Passport needs to be able to serialize and deserialize
  // users to support persistent login sessions
  passport.serializeUser(function(user, done) {
    debug('serializing user: ');
    debug(user);
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      debug('deserializing user:', user);
      done(err, user);
    });
  });

  // Setting up Passport Strategies
  // for Login and SignUp/Registration
  login(passport);
  signup(passport);

}
