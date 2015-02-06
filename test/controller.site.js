var chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  siteCtrl = require('../app/controllers/site')();

describe('Site Routes', function() {
  describe('GET /', function() {

    it("should respond", function() {
        var req, res;
        req = res = {};
        res.called = false;
        res. status = function() {};
        res.render = function() {
          this.called = true;
        };

        siteCtrl.home(req, res);
        expect(res.called).to.equal(true);
      });

    it('respond with 200', function() {
      siteCtrl.home({}, {
        render: function() {
        },
        status: function(statusCode) {
          assert.strictEqual(statusCode, 200);
        }
      });
    });

    it('render jade template pages/home', function() {
      siteCtrl.home({}, {
        render: function(template) {
          assert.strictEqual(template, 'pages/home');
        },
        status: function() {
        }
      });
    });

  });
});
