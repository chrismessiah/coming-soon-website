'use strict';

let path = require('path');
let hbs = require('hbs');
let fs = require('fs');

const masterHBS = `${global.projectRoot}/assets/views/master.hbs`;

// the {{body}} variable has to be set in order for this to work properly
module.exports = function(res, opts) {
  if (!opts.vars) opts.vars = {}

  let partial = fs.readFileSync(opts.partial, 'utf8');
  let template = hbs.handlebars.compile(partial)
  let html = template(opts.vars);
  opts.vars.body = html;
  res.render(masterHBS, opts.vars)
};
