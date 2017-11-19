var $ = require('jquery');
var subscribe = require('./subscribe');
var spin = require('./spin');

$(document).ready(function() {
  subscribe();
  spin();
});
