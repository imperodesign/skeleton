function helloWorld(req, res, next) {
  res.send('Hello World!')
}

function routes(app) {
  app.get('/', helloWorld)
}

module.exports = routes
