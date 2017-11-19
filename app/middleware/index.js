'use strict';

const express = require('express');
const hbs = require('hbs');
const compression = require('compression');
const bodyParser = require('body-parser');

module.exports = function(app) {
  require('./add-env-vars');

  app.use(compression());
  app.use(bodyParser.json({ type: 'application/json'}));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.set('port', process.env.PORT || 3000);
  app.use(bodyParser.text());

  app.set('view engine', 'hbs'); // will render .hbs files when res.render is called
  app.use(require('./add-helpers'));

  let controller = require('./add-controllers');
  let router = express.Router();
  app.use('/', router); // Register our base-route

  // set our assets folders
  app.use(express.static('public'));

  require('../router').getRouter(router, controller);

};
