function home(req, res) {
  res.render('pages/home');
}

function setup(app) {
  app.get('/', home);
}

module.exports = setup;
