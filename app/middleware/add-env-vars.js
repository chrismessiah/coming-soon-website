'use strict';

let fs = require('fs');

if (process.env.NODE_ENV != 'test' && process.env.NODE_ENV != 'prod' && fs.existsSync("./.env")) {
  require('dotenv').load();
}
