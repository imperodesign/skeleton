function helloWorld (req, res, next) {
  res.render('pages/home')
}

module.exports = function (app) {
  app.get('/', helloWorld)
}
