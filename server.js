var express = require('express');

var app = express();
app.disable('x-powered-by');

var port = process.env.PORT     || 3000;
var env  = process.env.NODE_ENV || 'production';

console.log("Starting ("+ env +")");

if (env === 'development') {
  require('babel-register');
  require('./tools/watch.js').default(app);
} else {
  app.use(require('./dist').default);
}

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
