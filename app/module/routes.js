/**
 * Routes for an example module
 */
const router = module.exports = require('express').Router()

router.use(function (req, res, next) {
  // route-specific middleware
  next()
})

router.get('/endpoint', function (req, res, next) {
  res.json({ message: 'Hello World!' })
})
