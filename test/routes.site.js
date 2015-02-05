var assert = require('chai').assert;
var siteRoutes = require('../app/routes/site').routes;

console.log(siteRoutes);

describe('Site routes', function() {
  describe('GET /', function() {

    it('respond with 200', function() {
      siteRoutes['/'].fn({}, {
        render: function() {
        },
        status: function(statusCode) {
          assert.strictEqual(statusCode, 200);
        }
      });
    });

    it('render jade template pages/home', function() {
      siteRoutes['/'].fn({}, {
        render: function(template) {
          assert.strictEqual(template, 'pages/home');
        },
        status: function() {
        }
      });
    });

  });
});
