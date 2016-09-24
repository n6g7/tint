'use strict';

const expect = require('chai').expect;
const path = require('path');

const palette = require('../lib/palette');


describe('palette', () => {
  const TEST_PATH = path.resolve(__dirname, './img.jpg');
  const COLOURS = 2;

  let res;
  beforeEach(() => {
    res = palette(TEST_PATH, COLOURS);
  });

  it('returns a promise', () => {
    expect(res).to.be.a('Promise');
  });

  it('resolves to an array with n colours', () => {
    return res.then(colours => {
      expect(colours).to.have.length(COLOURS);
    });
  });

  it('returns well-formatted colours', () => {
    return res.then(colours => {
      colours.forEach(colour => {
        expect(colour).to.have.property('counts')
          .that.is.a('number');
        expect(colour).to.have.property('rgb')
          .that.match(/^([0-9]{1,3},){2}[0-9]{1,3}$/i);
        expect(colour).to.have.property('hex')
          .that.match(/^[0-9a-f]{6}$/i);
        expect(colour).to.have.property('percentage')
          .that.is.a('number');
        expect(colour).to.have.property('percent')
          .that.match(/^[0-9.]+%$/);
      });
    });
  });
});
