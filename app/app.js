var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var csrf = require('csurf');

var config = require('./config');
var mongoose = require('mongoose');
// Connect to DB
mongoose.connect(config.mongodb.url);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(config.cookieSecret, { httpOnly: true }));
app.use('/public', express.static(__dirname + '/assets'));

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');

app.use(expressSession({secret: config.sessionSecret}));
app.use(passport.initialize());
app.use(passport.session());

 // Using the flash middleware provided by connect-flash to store messages in session
 // and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

// csfr token
app.use(csrf());

var siteRoutes = require('./routes/site')(passport);
var usersRoutes = require('./routes/users')(passport);
app.use('/', siteRoutes);
app.use('/users', usersRoutes);

// Handle 404
app.use(function(req, res) {
  res.status(404);
  res.render('errors/404.jade', {title: '404: Not Found'});
});

// Handler 403 - CFSR token
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN' && err.statusCode !== 403) { return next(err); }

  // handle CSRF token errors here
  res.status(403);
  res.render('errors/403.jade', {title:'403: Forbidden', error: new Error('Session has expired or form tampered with')});
});

// Handle 500
app.use(function(error, req, res, next) {
  res.status(500);
  res.render('errors/500.jade', {title:'500: Internal Server Error', error: error});
});


module.exports = app;
