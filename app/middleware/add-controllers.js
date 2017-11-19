'use strict';

// **********************************************************************
// Recursive read all controllers/**/*.js and add them to controller obj.
// dont touch this this file please
// **********************************************************************

const humps = require('humps');
const fs = require('fs');
const pathfs = require('path');

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(file => fs.statSync(pathfs.join(srcpath, file)).isDirectory());
}

// a dfs which recursively adds controller files
function recursiveAddControllers(composite, path) {
  // add controller files before digging deeper
  let methodFiles = fs.readdirSync(path);
  methodFiles.forEach((fileName) => {
    if (fileName.includes('.js')) { // handle js controller files only
      let methodName = humps.camelize(fileName).replace('.js','');
      composite[methodName] = require(`${path}/${fileName}`);
    }
  });

  // get first folder and go one level bellow
  let folders = getDirectories(path);
  folders.forEach((folderName) => {
    let totalpath = `${path}/${folderName}`;
    let controllerName = humps.camelize(folderName);
    composite[controllerName] = {};
    recursiveAddControllers(composite[controllerName], totalpath)
  });
}

let controllerPath = `${__dirname}/../controllers`;
let controller = {};
recursiveAddControllers(controller, controllerPath) // construct

module.exports = controller;
