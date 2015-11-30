'use strict';

let chai = require('chai');
chai.use(require('chai-things'));
let expect = chai.expect;
let Parsick = require('../index');

// create a new Parsick
let parsick = new Parsick();

describe('Parsick module', () => {
  describe('#constructor', () => {
    it('should be a function', () => {
      expect(Parsick).to.be.a('function');
    });
  });

  describe('#instance', () => {
    it('should be an object', () => {
      expect(parsick).to.be.an('object');
    });

    it('should initialize adapters', () => {
      expect(parsick).to.have.property('adapters');
      expect(parsick.adapters).not.be.emtpy;
    });
  });

  describe('#adapters', () => {
    it('should have 2 functions', () => {
      expect(parsick.adapters).to.satisfy((obj) => { return Object.keys(obj).length >= 2 })
    });

    it('should have json parser', () => {
      expect(parsick.adapters).to.have.property('json');
      expect(parsick.adapters.json).to.be.a('function');
    });

    it('should have xml parser', () => {
      expect(parsick.adapters).to.have.property('xml');
      expect(parsick.adapters.xml).to.be.a('function');
    });
  });

  describe('#parse()', () => {
    describe('should throw an TypeError', () => {
      it('when no arguments are passed', () => {
        let fn = () => { parsick.parse() };
        expect(fn).to.be.throw(TypeError);
        expect(fn).to.be.throw(`You need send 'type', 'source' and 'fields' to parse your data`);
      });

      it('when type has a invalid type', () => {
        let fn = () => { parsick.parse('dson', '', ''); };
        expect(fn).to.be.throw(TypeError);
        expect(fn).to.be.throw('Type must be in: ' + Object.keys(parsick.adapters).join(', '));
      });
    });

    it('should return the correct data', () => {
      let ret = parsick.parse('json', {mark: 1, mark2: 0}, 'mark');
      expect(ret).to.be.an('array');
      expect(ret).to.have.length.least(1);
      expect(ret).all.have.property('mark', 1);
      expect(ret).all.not.have.property('mark2');
    });
  });
});
