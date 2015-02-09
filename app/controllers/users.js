
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

  function getSignout(req, res) {
    req.logout();
    res.redirect('/');
  }
  ctrl.getSignout = getSignout;

  return ctrl;

}
