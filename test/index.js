'use strict';

console.log('NODE_ENV', process.env.NODE_ENV)

var expect = require('chai').expect;
var Parsick = require('../index');

// create a new Parsick
var parsick = new Parsick();

describe('Parsick module', function () {
  describe('#constructor', function () {
    it('should be a function', function () {
      expect(Parsick).to.be.a('function');
    });
  });

  describe('#instance', function () {
    it('should be an object', function () {
      expect(parsick).to.be.an('object');
    });

    it('should initialize adapters', function () {
      expect(parsick).to.have.property('adapters');
      expect(parsick.adapters).not.be.emtpy;
    });
  });

  describe('#adapters', function () {
    it('should have 2 functions', function () {
      expect(parsick.adapters).to.satisfy(function (obj) { return Object.keys(obj).length >= 2 })
    });

    it('should have json parser', function () {
      expect(parsick.adapters).to.have.property('json');
      expect(parsick.adapters.json).to.be.a('function');
    });

    it('should have xml parser', function () {
      expect(parsick.adapters).to.have.property('xml');
      expect(parsick.adapters.xml).to.be.a('function');
    });
  });

  describe('#parse()', function () {
    describe('should throw an TypeError', function () {
      it('when no arguments are passed', function () {
        var fn = function () { parsick.parse() };
        expect(fn).to.be.throw(TypeError);
        expect(fn).to.be.throw('You need send \'type\', \'source\' and \'fields\' to parse your data');
      });

      it('when type has a invalid type', function () {
        var fn = function () { parsick.parse('dson', '', ''); };
        expect(fn).to.be.throw(TypeError);
        expect(fn).to.be.throw('Type must be in: ' + Object.keys(parsick.adapters).join(', '));
      });
    });

    it('should return the correct data', function () {
      var ret = parsick.parse('json', {mark: 1, mark2: 0}, 'mark');
      expect(ret).to.be.an('array');
      expect(ret).to.have.length.least(1);
      expect(ret[0]).to.have.property('mark', 1);
    });
  });
});
