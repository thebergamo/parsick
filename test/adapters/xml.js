'use strict';

var expect = require('chai').expect;
var parseXml = require('../../adapters/xml');

describe('XML adapter', function () {
  it('should be a function', function () {
    expect(parseXml).to.be.a('function');
  });

  describe('when a non string is passed', function () {
    it('should throw an TypeError', function () {
      var fn = function () { parseXml(1, 'mark'); };

      expect(fn).to.be.throw(TypeError);
      expect(fn).to.be.throw('XML source must be an String');
    });
  });

  describe('when one layer json is passed', function () {
    var xmlSample = '<root><mark>1</mark><mark2>0</mark2></root>';
    it('should accept one field', function () {
      var ret = parseXml(xmlSample, 'mark');

      expect(ret).to.be.an('array');
      expect(ret).to.have.length.least(1);
      expect(ret[0]).to.have.property('mark', 1);
    });

    it('should accept an array fields', function () {
      var ret = parseXml(xmlSample, ['mark', 'mark2']);

      expect(ret).to.be.an('array');
      expect(ret).to.have.length.least(1);
      expect(ret[0]).to.have.property('mark', 1);
      expect(ret[0]).to.have.property('mark2', 0);
    });

    it('should accept an empty string', function () {
      var ret = parseXml(xmlSample, '');

      expect(ret).to.be.an('array');
      expect(ret).to.be.empty;
    });

    it('should empty when field is not found', function () {
      var ret = parseXml(xmlSample, 'bug');

      expect(ret).to.be.an('array');
      expect(ret).to.be.empty;
    });
  });

  describe('when a nested layer json is passed', function () {  
    var xmlSample = '<?xml version="1.0"?>\
      <catalog>\
        <book id="bk101">\
          <author>Gambardella, Matthew</author>\
          <title>XML Developers Guide</title>\
          <genre>Computer</genre>\
          <price>44.95</price>\
          <publish_date>2000-10-01</publish_date>\
          <description>An in-depth look at creating applications with XML.</description>\
        </book>\
        <book id="bk102">\
          <author>Ralls, Kim</author>\
          <title>Midnight Rain</title>\
          <genre>Fantasy</genre>\
          <price>5.95</price>\
          <publish_date>2000-12-16</publish_date>\
          <description>A former architect battles corporate zombies, of the world.</description>\
        </book>\
      </catalog>';

    it('should accept one field', function () {
      var ret = parseXml(xmlSample, 'author');

      expect(ret).to.be.an('array');
      expect(ret).to.have.length.least(2);
      expect(ret[0]).to.have.property('author', 'Gambardella, Matthew');
      expect(ret[1]).to.have.property('author', 'Ralls, Kim');
    });

    it('should accept an array fields', function () {
      var ret = parseXml(xmlSample, ['title', 'author']);

      expect(ret).to.be.an('array');
      expect(ret).to.have.length.least(2);
      expect(ret[0]).to.have.property('author', 'Gambardella, Matthew');
      expect(ret[0]).to.have.property('title', 'XML Developers Guide');
      expect(ret[1]).to.have.property('author', 'Ralls, Kim');
      expect(ret[1]).to.have.property('title', 'Midnight Rain');
    });

    it('should accept an empty string', function () {
      var ret = parseXml(xmlSample, '');

      expect(ret).to.be.an('array');
      expect(ret).to.be.empty;
    });

    it('should empty when field is not found', function () {
      var ret = parseXml(xmlSample, 'bug');

      expect(ret).to.be.an('array');
      expect(ret).to.be.empty;
    });
  });

});

