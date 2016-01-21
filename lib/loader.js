'use strict';

// load deps
var fs = require('fs');
var path = require('path');

module.exports = function (dir) {
  var rootPath = path.join(__dirname, '/../', dir);
  var ret = [];
  fs.readdirSync(rootPath).forEach(function (file) {
    if (!fs.statSync(rootPath + '/' + file).isFile() || !isLoadable(file) || file === 'index.js') {
      return;
    }

    ret.push({
      File: require(path.join(rootPath, file)),
      name: camelize(path.basename(file, '.js'))
    });
  });

  return ret;
};

exports.camelize = camelize;

/**
 *
 * Check if the file in target is loadable
 *
 */
function isLoadable (name) {
  return /\.(js|coffee|lf)$/.test(name);
}

/**
 *
 * Camelize strings
 *
 */
function camelize (str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    return index !== 0 ? match.toLowerCase() : match.toUpperCase();
  });
}
