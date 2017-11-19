'use strict';
var prettyjson = require('prettyjson');

/* PURPOSE:
 * Return a JSON representation of the error
 *
 * TAKES: res, code, message
 * RETURNS: error { code, message }
 */

function getFormatedStack(stack) {
  if (!stack) return "";
  var stack = stack.match(/\n\s{4}at\s(.*)\s\((.*\/)?(.*)\:([\d]+\:[\d]+)\)\n/);
  if (!stack) return "";
  stack[2] = stack && stack[2] && stack[2].length?stack[2].replace(/^.*\/(.*\/)$/, " $1"):"";
  stack = "in "+stack[1]+", "+stack[2]+stack[3]+" "+stack[4];
  return stack;
}


module.exports = function(res, code, message) {
  if (!code) {code = 500}
  if (!message) {message = "Sorry, we could not process your request.";}

  var stack;
  let attributeName;
  let field;
  let dbError = false;

  if (arguments[1] && arguments[1].routine) {
    dbError = true;
  }


  if (arguments[1] && typeof(arguments[1]) === "string") {
    message = arguments[1];
  }

  if (typeof arguments[1] === "object") {
    if (arguments[1].length > 1) {
      // Promise error
      if (arguments[1].cause) {
        message = arguments[1].cause.message;
        code = 500;
      } else {
        code = arguments[1][0];
        message = arguments[1][1];
      }
    } else if (arguments[1].status) {
      code = arguments[1].status;
      message = arguments[1].title;

      if (arguments[1].field) {
        field = arguments[1].field;
      }

      // If you don't want it to be "title" but "message" for example:
      if (arguments[1].attribute) {
        attributeName = arguments[1].attribute;
      }
    } else if (arguments[1]) {
      message = String(arguments[1]);
    }

    stack = getFormatedStack(arguments[1].stack);
  }

  if (arguments[2]) {
    code    = arguments[1] || 500;
    message = arguments[2] || "Something went wrong!";
  }

  if (arguments[1] && arguments[1].name === "error") {
    code = 500;
    message = arguments[1].message;
  }


  if (arguments[1] && arguments[1].code === 2 && arguments[1].model) {
    let ormObj = arguments[1];

    code = 404;
    message = `Could not find ${ormObj.model} with this ID`;
    stack = null;
  }


  var errorObj = {
    status: parseInt(code),
    title: message
  };

  if (stack) {
    errorObj.stack = stack;
  }

  if (field) {
    errorObj.field = field;
  }

  if (attributeName) {
    errorObj[attributeName] = [ errorObj.title ];
  }

  // Nice error message for the console
  if (process.env.NODE_ENV !== 'test') {
    if (dbError) {
      errorObj.SQL_ERROR = true;
    }

    console.log(prettyjson.render(errorObj, {
      keysColor:    'yellow',
      dashColor:    'magenta',
      numberColor:  'cyan',
      stringColor:  'white'
    }));
  }

  // Nice error message for the user
  var json = { errors: [errorObj] };
  return res.status(code).json(json);
}
