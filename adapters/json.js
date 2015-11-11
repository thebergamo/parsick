'use strict';

let _ = require('lodash');

module.exports = parseJson;

function parseJson (source, fields) {
  if (!_.isArray(source)) {
    source = [source];
  }

  return _.map(source, pick).shift();

  function pick (obj) {
    return picker(obj, fields);
  }
}

function picker (obj, keys) {
  let res = [];
  let ret;

  _.forEach(obj, nestedPick);

  if(_.isEmpty(res) && (ret = _.pick(obj, keys)) && !_.isEmpty(ret)) {
    res.push(ret);
  }

  return res;

  function nestedPick (obj) {
    let ret;

    if(_.isObject(obj) && (ret = _.pick(obj, keys)) && !_.isEmpty(ret)) {
      res.push(ret);
    } else if(_.isObject(obj)) {
      obj = picker(obj, keys);
      if(!_.isEmpty(obj)) {
        res = obj;
      }
    }
  }
}

