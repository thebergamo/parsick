'use strict';

let _ = require('lodash');

let loader = require('./lib/loader');

function Parsick (adapters) {
  this.adapters = adapters || loadAdapters();
};

module.exports = Parsick;

Parsick.prototype.parse = function (type, source, fields) {
  if(arguments.length < 3) {
    throw new TypeError(`You need send 'type', 'source' and 'fields' to parse your data`);
  }

  if(!_.has(this.adapters, type)) {
    throw new TypeError('Type must be in: '+ Object.keys(this.adapters).join(', '));
  }

  return this.adapters[type](source, fields);
};

function loadAdapters () {
  let adapters = {};

  for (let adapter of loader('adapters')) {
    let name = adapter.name.toLowerCase();
    adapters[name] = adapter.File;
  }
  return adapters;
}
