var usersCtrl = require('../controllers/users.js');

// setup
function setup(app) {
  app.get('/users/login',usersCtrl.login);
  app.post('/users/login', usersCtrl.login);
  app.get('/users/signup', usersCtrl.signup);
  app.post('/users/signup', usersCtrl.signup);
}

// export the setup function
module.exports = setup;
