/**
 * routes for example module
 */
var router = require('express').Router();

// route-specific middleware
router.use(function(req, res, next) {
  //... logic
  next();
});

router.get('/endpoint', function(req, res, next) {
  res.json({ success: true });
});

module.exports = router;
