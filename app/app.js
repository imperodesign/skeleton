var express = require('express')
  , bodyParser = require('body-parser')
  , session = require('express-session')
  , cookieParser    = require('cookie-parser')
  , csrf = require('csurf')
  , methodOverride = require('method-override')
  , config = require('./config')
  , app = express()
  , MongoStore = require('connect-mongo')(express) // need to store session later
  , mongoose = require('mongoose')
  , logger = require('./lib/logger');


// log configuring express
logger.info("configuring express ...");

// to support cookie parse
app.use(cookieParser(config.cookieSecret, { httpOnly: true }));

// to support JSON-encoded bodies
app.use(bodyParser.json());

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

// trust first proxy
app.set('trust proxy', 1) ;

// use session middleware
app.use(session({
  name: 'sessionID',
  secret: config.sessionSecret,
  cookie: {
    path: '/',
    httpOnly: true,
      secure: false,
      maxAge: 3600000
    },
  rolling: true,
  resave: false,
  saveUninitialized: true
}));

// csfr token
app.use(csrf());

// override with POST having ?_method=DELETE
// app.use(methodOverride('_method'))

// views
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// log http requests
app.use(function (req, res, next) {
  logger.log('info', req.method.toUpperCase() + ' ' + req.originalUrl);
  next();
});

// static files
app.use('/public', express.static(__dirname + '/assets'));

// routes
[
  './routes/site',
  './routes/users'
  // add more...
].forEach(function (routePath) {
  require(routePath)(app);
});

// Handle 404
app.use(function(req, res) {
  logger.log('warn', req.method.toUpperCase() + ' ' + req.originalUrl + ' (404)');
  res.status(404);
  res.render('pages/errors/404.jade', {title: '404: Not Found'});
});

// Handler 403 - CFSR token
app.use(function (err, req, res, next) {

  if (err.code !== 'EBADCSRFTOKEN' && err.statusCode !== 403) { return next(err); }

  // handle CSRF token errors here
  logger.error('403 Forbidden ', err);
  res.status(403);
  res.render('pages/errors/403.jade', {title:'403: Forbidden', error: new Error('Session has expired or form tampered with')});
});

// Handle 500
app.use(function(error, req, res, next) {
  logger.error('500 Internal Server Error', err);
  res.status(500);
  res.render('pages/errors/500.jade', {title:'500: Internal Server Error', error: error});
});

// connect to mongo
logger.info("connecting to mongodb ...");
mongoose.connect('mongodb://' + config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.dbname);

// start the http server
app.listen(config.express.port, config.express.ip, function (error) {
  if(error) {
    logger.error('unable to listen for connections', error);
    process.exit(10);
  }
  logger.info('app is listening on http://' +
    config.express.ip + ':' + config.express.port);
});

// export app module
module.exports = app;
