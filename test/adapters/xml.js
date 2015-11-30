'use strict';

let chai = require('chai');
chai.use(require('chai-things'));
let expect = chai.expect;
let parseXml = require('../../adapters/xml');

describe('XML adapter', () => {
  it('should be a function', () => {
    expect(parseXml).to.be.a('function');
  });

  describe('when a non string is passed', () => {
    it('should throw an TypeError', () => {
      let fn = () => { parseXml(1, 'mark'); };

      expect(fn).to.be.throw(TypeError);
      expect(fn).to.be.throw('XML source must be an String');
    });
  });

  describe('when one layer json is passed', () => {
    let xmlSample = '<root><mark>1</mark><mark2>0</mark2></root>';
    it('should accept one field', () => {
      let ret = parseXml(xmlSample, 'mark');

      expect(ret).to.be.an('array');
      expect(ret).to.have.length.least(1);
      expect(ret).all.have.property('mark');
    });

    it('should accept an array fields', () => {
      let ret = parseXml(xmlSample, ['mark', 'mark2']);

      expect(ret).to.be.an('array');
      expect(ret).to.have.length.least(1);
      expect(ret).all.have.property('mark');
      expect(ret).all.have.property('mark2');
    });

    it('should accept an empty string', () => {
      let ret = parseXml(xmlSample, '');

      expect(ret).to.be.an('array');
      expect(ret).to.be.empty;
    });

    it('should empty when field is not found', () => {
      let ret = parseXml(xmlSample, 'bug');

      expect(ret).to.be.an('array');
      expect(ret).to.be.empty;
    });
  });

  describe('when a nested layer json is passed', () => {
    let xmlSample = `<?xml version="1.0"?>
      <catalog>
        <book id="bk101">
          <author>Gambardella, Matthew</author>
          <title>XML Developers Guide</title>
          <genre>Computer</genre>
          <price>44.95</price>
          <publish_date>2000-10-01</publish_date>
          <description>An in-depth look at creating applications with XML.</description>
        </book>
        <book id="bk102">
          <author>Ralls, Kim</author>
          <title>Midnight Rain</title>
          <genre>Fantasy</genre>
          <price>5.95</price>
          <publish_date>2000-12-16</publish_date>
          <description>A former architect battles corporate zombies, of the world.</description>
        </book>
      </catalog>`;

    it('should accept one field', () => {
      let ret = parseXml(xmlSample, 'author');

      expect(ret).to.be.an('array');
      expect(ret).to.have.length.least(2);
      expect(ret).all.have.property('author');

      expect(ret).all.not.have.property('id');
      expect(ret).all.not.have.property('title');
      expect(ret).all.not.have.property('price');
      expect(ret).all.not.have.property('publish_date');
      expect(ret).all.not.have.property('description');
    });

    it('should accept an array fields', () => {
      let ret = parseXml(xmlSample, ['title', 'author']);

      expect(ret).to.be.an('array');
      expect(ret).to.have.length.least(2);
      expect(ret).all.have.property('author');
      expect(ret).all.have.property('title');


      expect(ret).all.not.have.property('id');
      expect(ret).all.not.have.property('price');
      expect(ret).all.not.have.property('publish_date');
      expect(ret).all.not.have.property('description');
    });

    it('should accept an empty string', () => {
      let ret = parseXml(xmlSample, '');

      expect(ret).to.be.an('array');
      expect(ret).to.be.empty;
    });

    it('should empty when field is not found', () => {
      let ret = parseXml(xmlSample, 'bug');

      expect(ret).to.be.an('array');
      expect(ret).to.be.empty;
    });
  });
});

