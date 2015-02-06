
module.exports = function(passport) {

  var ctrl = {};

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
