// Handlers
function home(req, res, next) {
  res.status(200);
  res.render('pages/home');
}

// Setup
var siteRoutes = {
  '/': {
    method: 'get',
    fn: home
  }
};

function setup(app) {
  app.get('/', siteRoutes['/'].fn)
}

// Export the handlers
exports.routes = siteRoutes;

// Setup
exports.setup = setup;
