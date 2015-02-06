var siteCtrl = require('../controllers/site.js');

// setup
function setup(app) {
  app.get('/', siteCtrl.home);
}

// export the setup function
module.exports = setup;
