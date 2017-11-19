'use strict';

global.projectRoot = __dirname;

var express = require('express');
var app = express();

let middleware = require('./app/middleware');
middleware(app);

app.listen(app.get('port'), function () {
  console.log(`Magick happens on port ${app.get('port')}!`);
});

module.exports = app; // for tests
