function helloWorld (req, res, next) {
  res.send('Hello World!')
}

module.exports = function (app) {
  app.get('/', helloWorld)
}
