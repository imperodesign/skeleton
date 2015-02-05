// handlers
function home(req, res, next) {
  res.status(200);
  res.render('pages/home');
}

// define routes (for tests)
var siteRoutes = {
  '/': {
    method: 'get',
    fn: home
  }
};

// setup
function setup(app) {
  app.get('/', siteRoutes['/'].fn)
}

// export the handlers
exports.routes = siteRoutes;

// export the setup function
exports.setup = setup;
