// handlers
function home(req, res, next) {
  res.status(200);
  res.render('pages/home');
}

exports.home = home;
