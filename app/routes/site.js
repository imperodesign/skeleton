function home(req, res, next) {
  res.render('pages/home');
}

function setup(app) {
  app.get('/', home);
}

module.exports = setup;
