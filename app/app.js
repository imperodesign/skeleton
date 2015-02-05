var express = require('express');
var config = require('./config');
var app = express();

// logs
var log = require('winston').loggers.get('app:server');

// views
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// static files
app.use('/assets', express.static(__dirname + '/assets'));

// routes
[
  './routes/site'
  // add more...
].forEach(function (routePath) {
  require(routePath).setup(app);
});

// Handle 404
app.use(function(req, res) {
  res.status(400);
  res.render('pages/errors/404.jade', {title: '404: File Not Found'});
});

// Handle 500
app.use(function(error, req, res, next) {
  res.status(500);
  res.render('pages/errors/500.jade', {title:'500: Internal Server Error', error: error});
});


app.listen(config.express.port, config.express.ip, function (error) {
  if (error) {
    log.error('Unable to listen for connections', error);
    process.exit(10);
  }
  log.info('app is listening on http://' +
    config.express.ip + ':' + config.express.port);
});

// export app module
module.exports = app;
