var usersCtrl = require('../controllers/users.js');

// define routes (for tests)
var usersRoutes = {
  '/users/login': {
    method: 'get',
    fn: usersCtrl.login
  },
  '/users/login': {
    method: 'post',
    fn: usersCtrl.login
  },
  '/users/signup': {
    method: 'get',
    fn: usersCtrl.signup
  },
  '/users/signup': {
    method: 'post',
    fn: usersCtrl.signup
  }
};

// setup
function setup(app) {
  app.get('/users/login', usersRoutes['/users/login'].fn)
  app.post('/users/login', usersRoutes['/users/login'].fn)
  app.get('/users/signup', usersRoutes['/users/signup'].fn)
  app.post('/users/signup', usersRoutes['/users/signup'].fn)
}

// export the handlers
exports.routes = usersRoutes;

// export the setup function
exports.setup = setup;
