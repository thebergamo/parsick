'use strict';

let expect = require('chai').expect;
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
      expect(ret[0]).to.have.property('mark', 1);
    });

    it('should accept an array fields', () => {
      let ret = parseJson(jsonSample, ['mark', 'mark2']);

      expect(ret).to.be.an('array');
      expect(ret).to.have.length.least(1);
      expect(ret[0]).to.have.property('mark', 1);
      expect(ret[0]).to.have.property('mark2', 0);
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
      expect(ret[0]).to.have.property('author', 'Gambardella, Matthew');
      expect(ret[1]).to.have.property('author', 'Ralls, Kim');
    });

    it('should accept an array fields', () => {
      let ret = parseJson(jsonSample, ['title', 'author']);

      expect(ret).to.be.an('array');
      expect(ret).to.have.length.least(2);
      expect(ret[0]).to.have.property('author', 'Gambardella, Matthew');
      expect(ret[0]).to.have.property('title', 'XML Developers');
      expect(ret[1]).to.have.property('author', 'Ralls, Kim');
      expect(ret[1]).to.have.property('title', 'Midnight Rain');
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
