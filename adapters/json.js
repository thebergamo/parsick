'use strict';

let _ = require('lodash');

module.exports = parseJson;

function parseJson (source, fields) {
  if (_.isString(source)) {
    try {
      source = JSON.parse(source);
    } catch (err) {
      throw new SyntaxError('There are errors in your JSON: '+ err.message);
    }
  }
  
  source = [source];

  return _.map(source, pick).shift();


  function pick (obj) {
    return picker(obj, fields);
  }
}

function picker (obj, keys) {
  let res = [];
  let ret;

  keys = keys.map((key) => key.toLowerCase());

  if((ret = _.pick(obj, picki)) && !_.isEmpty(ret)) {
    res.push(ret);
  }

  _.forEach(obj, nestedPick);

  return res;

  function nestedPick (obj) {
    let ret;
    if(_.isObject(obj) && (ret = _.pick(obj, picki)) && !_.isEmpty(ret)) {
      res.push(ret);
    } else if(_.isObject(obj)) {
      obj = picker(obj, keys);
      if(!_.isEmpty(obj)) {
        res = obj;
      }
    }
  }

  function picki (v, k) {
    return keys.indexOf(k.toLowerCase()) > -1; 
  }
}

