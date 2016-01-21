'use strict';

var _ = require('lodash');
var xml = require('xml2json');
var parseJson = require('./json');

module.exports = parseXml;

function parseXml (source, fields) {
  if (!_.isString(source)) {
    throw new TypeError('XML source must be an String');
  }

  var obj = xml.toJson(source, {object: true, coerce: true});

  return parseJson(obj, fields);
}
