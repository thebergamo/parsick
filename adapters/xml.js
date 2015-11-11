'use strict';

let _ = require('lodash');
let xml = require('xml2json');
let parseJson = require('./json');

module.exports = parseXml;

function parseXml (source, fields) {
  if (!_.isString(source)) {
    throw new TypeError('XML source must be an String');
  }

  let obj = xml.toJson(source, {object: true, coerce: true});

  return parseJson(obj, fields);
}
