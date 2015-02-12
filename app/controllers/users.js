var async = require('async')
  , validator = require('validator')
  , User = require('../models/user');

module.exports = function(passport) {

  var ctrl = {};

  function isAuthenticated(req, res, next) {
    // Passport adds isAuthenticated method to request object.
    // A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated()) {
      return next();
    }

    // if the user is not authenticated then redirect him to the login page
    res.redirect('/users/login');
  }
  ctrl.isAuthenticated = isAuthenticated;

  function getLogin(req, res) {
    // Display the Login page with any flash message, if any
    res.render('pages/login', {
      csrfToken: req.csrfToken(),
      message: req.flash('message')
    });
  }
  ctrl.getLogin = getLogin;

  function postLogin() {
    // not used
  }
  ctrl.postLogin = postLogin;

  function getSignup(req, res){
    res.render('pages/signup', {
      csrfToken: req.csrfToken(),
      message: req.flash('message')
    });
  }
  ctrl.getSignup = getSignup;

  function postSignup() {
    // not used
  }
  ctrl.postSignup = postSignup;

  function getForgot(req, res) {
    res.render('pages/forgot', {
      csrfToken: req.csrfToken(),
      message: req.flash('message'),
      user: req.user || { email: '' }
    });
  }
  ctrl.getForgot = getForgot;

  function postForgot(req, res, next) {
    async.waterfall([
      function checkEmail(cb) {
        var email = req.param('email', null);
        if(!validator.isEmail(email)) {
          return cb({
            message: 'Email must be a valid address',
            status: 400
          });
        }
        cb(null, email);
      },
      function loadUser(email, cb) {
        // find the user querying in the database
        User.findOne({
            email: email
          },
          function(err, user) {
            // In case of any error, return using the done method
            if (err) { return next(err); } // throwing 500 Internal Error
            // Email does not exist, log the error and redirect back
            if (!user) {
              return cb({
                message: 'User Not Found with email ' + email,
                status: 404
              });
            }
            cb(null, user);
          }
        );
      },
      function generateNewToken(user, cb) {
        user.createNewToken();
        user.save();
        cb(null, user);
      },
      function sendEmail(user, cb) {
        req.mandrill('/messages/send', {
          message: {
            to: [{email: user.email, name: user.firstName + ' ' + user.lastName}],
            from_email: 'no-reply@imperodesign.com',
            subject: 'Reset password',
            text: 'Your token is: ' + user.token
          }
        }, function(err, res) {
          // shit, there was an error
          if (err) { return next(err); } // throwing 500 Internal Error
          // mail sent
          cb(null, 'An email has been sent to you');
        });
      }
    ], function(err, msg){
      var message = msg || err.message
        , status = msg ? 200 : err.status
        , email = msg ? '' : req.param('email', '');

      res.status(status).render('pages/forgot', {
        csrfToken: req.csrfToken(),
        user: { email: email },
        message: message
      });
    });
  }
  ctrl.postForgot = postForgot;

  function getForgotToken(req, res, next) {

    User.findOne({
        token: req.param('token')
      },
      function(err, user) {
        if (err) { return next(err); } // throwing 500 Internal Error

        // Email does not exist, log the error and redirect back
        if (!user || user.tokenValidity < Date.now()) {
          return res.status(401).send('Invalid token');
        }
        res.render('pages/forgot-token', {
          token: user.token
        });
      }
    );
  }
  ctrl.getForgotToken = getForgotToken;

  function postForgotToken(req, res) {
    res.render('pages/forgot-token');
  }
  ctrl.postForgotToken = postForgotToken;

  function getSignout(req, res) {
    req.logout();
    res.redirect('/');
  }
  ctrl.getSignout = getSignout;

  return ctrl;

}
