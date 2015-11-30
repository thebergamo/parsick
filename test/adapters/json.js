'use strict';

let chai = require('chai');
chai.use(require('chai-things'));
let expect = chai.expect;
let parseJson = require('../../adapters/json');

describe('JSON adapter', () => {
  it('should be a function', () => {
    expect(parseJson).to.be.a('function');
  });

  describe('when a broken json is passed', () => {
    let jsonSample = '{mark: 0, }';

    it('should throw a SyntaxError', () => {
      let fn = () => { parseJson(jsonSample, 'mark'); };

      expect(fn).to.throw(SyntaxError);
      expect(fn).to.throw(/There are errors in your JSON: /);
    });
  });

  describe('when one layer json is passed', () => {
    let jsonSample = {mark: 1, mark2: 0};
    it('should accept one field', () => {
      let ret = parseJson(jsonSample, 'mark');

      expect(ret).to.be.an('array');
      expect(ret).to.have.length.least(1);
      expect(ret).all.have.property('mark');
    });

    it('should accept an array fields', () => {
      let ret = parseJson(jsonSample, ['mark', 'mark2']);

      expect(ret).to.be.an('array');
      expect(ret).to.have.length.least(1);
      expect(ret).all.have.property('mark');
      expect(ret).all.have.property('mark2');
    });

    it('should accept an empty string', () => {
      let ret = parseJson(jsonSample, '');

      expect(ret).to.be.an('array');
      expect(ret).to.be.empty;
    });

    it('should empty when field is not found', () => {
      let ret = parseJson(jsonSample, 'bug');

      expect(ret).to.be.an('array');
      expect(ret).to.be.empty;
    });
  });

  describe('when a nested layer json is passed', () => {
    let jsonSample = {
      catalog : {
        book: [
          {
            id: 'bk101',
            author: 'Gambardella, Matthew',
            title: 'XML Developers',
            genre: 'Computer',
            price: 44.95
          },
          {
            id: 'bk102',
            author: 'Ralls, Kim',
            title: 'Midnight Rain',
            genre: 'Fantasy',
            price: 5.95
          }
        ]
      }
    };
    it('should accept one field', () => {
      let ret = parseJson(jsonSample, 'author');

      expect(ret).to.be.an('array');
      expect(ret).to.have.length.least(2);
      expect(ret).all.have.property('author');

      expect(ret).all.not.have.property('id');
      expect(ret).all.not.have.property('title');
      expect(ret).all.not.have.property('price');
    });

    it('should accept an array fields', () => {
      let ret = parseJson(jsonSample, ['title', 'author']);

      expect(ret).to.be.an('array');
      expect(ret).to.have.length.least(2);
      expect(ret).all.have.property('author');
      expect(ret).all.have.property('title');

      expect(ret).all.not.have.property('id');
      expect(ret).all.not.have.property('price');
    });

    it('should accept an empty string', () => {
      let ret = parseJson(jsonSample, '');

      expect(ret).to.be.an('array');
      expect(ret).to.be.empty;
    });

    it('should empty when field is not found', () => {
      let ret = parseJson(jsonSample, 'bug');

      expect(ret).to.be.an('array');
      expect(ret).to.be.empty;
    });
  });

});
