var express = require('express');
var config = require('app/config');
var app = express();

// logs
var log = require('winston').loggers.get('app:server');

// views
app.set('views', __dirname+'/views');
app.set('view engine', 'jade');

// routes
[
  'app/site/routes'
  // ...
].forEach(function (routePath) {
  require(routePath)(app);
});

app.listen(config.express.port, config.express.ip, function (error) {
  if (error) {
    log.error('Unable to listen for connections', error);
    process.exit(10);
  }
  log.info('app is listening on http://' +
    config.express.ip + ':' + config.express.port);
});
