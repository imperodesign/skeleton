var express = require('express');
var bodyParser = require('body-parser')
var config = require('./config');
var app = express();
var mongoose = require('mongoose');

// logs
var log = require('winston').loggers.get('app:server');

// parser
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// views
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// static files
app.use('/assets', express.static(__dirname + '/assets'));

// routes
[
  './routes/site',
  './routes/users'
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

// connect to mongo
mongoose.connect('mongodb://' + config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.dbname);

// start the http server
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
