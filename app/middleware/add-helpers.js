'use strict';

let sql = require('../utils/connect-to-db');

let rendr = require('../utils/proper-render');
let error = require('../utils/send-error');
let success = require('../utils/send-success');

module.exports = (req, res, next) => {
  // Requests
  req.sql = sql;

  // Responses
  res.rendr = rendr.bind(this, res);
  res.error = error.bind(this, res);
  res.success = success.bind(this, res);

  next();
}
