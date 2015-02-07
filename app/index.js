#!/usr/bin/env node
var debug = require('debug')('skeleton')
  , app = require('../app/app')
  , config = require('./config');


app.set('port', config.express.port);

var server = app.listen(app.get('port'), function() {
  // Set DEBUG=skeleton eventually
  debug('Express server listening on port ' + server.address().port);
});
