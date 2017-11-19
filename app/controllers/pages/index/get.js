'use strict';

let view = __dirname.split('/'); view = view[view.length-1];

module.exports = function(req, res) {
  res.rendr({
    partial: `${global.projectRoot}/assets/views/${view}.hbs`,
    vars: {
      displayHello: view,
      className: 'tomato',
      key: 'pineapple',
    }
  });
};
