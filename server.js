var express = require('express');

var app = express();
app.disable('x-powered-by');

var port = process.env.PORT     || 3000;
var env  = process.env.NODE_ENV || 'production';

console.log("Starting ("+ env +")");

var service = null;
if (env === 'development') {
  require('babel-register');
  runService(require('./tools/watch.js'));
} else {
  runService(require('./dist'));
}

function runService(service) {
  app.use(service.default);

  if (service.cleanup) {
    app.on('close', service.cleanup);
  }

  if (service.init) {
    service.init().then(listen);
  } else {
    listen();
  }
}

function listen() {
  app.listen(port, function () {
    console.log(`Listening on port ${port}`);
  });
}
