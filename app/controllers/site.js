module.exports = function(passport) {

  var ctrl = {};

  function home(req, res, next) {
    res.status(200);
    res.render('pages/home');
  }
  ctrl.home = home;

  function dashboard(req, res) {
    res.render('pages/dashboard', {
      user: req.user
    });
  }
  ctrl.dashboard = dashboard;

  return ctrl;

}
